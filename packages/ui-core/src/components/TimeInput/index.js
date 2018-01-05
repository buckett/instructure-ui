/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import DateTime from '@instructure/ui-utils/lib/i18n/DateTime'
import Locale from '@instructure/ui-utils/lib/i18n/Locale'

import Autocomplete from '../Autocomplete'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/forms
---
**/
@themeable(theme, styles)
class TimeInput extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * Whether to default to the first option when `defaultValue` hasn't been specified.
     */
    defaultToFirstOption: PropTypes.bool,
    /**
     * An ISO 8601 formatted date string to use if `value` isn't provided.
     */
    defaultValue: CustomPropTypes.iso8601,
    /**
     * The format to use when displaying the possible and currently selected options.
     *
     * See [moment.js formats](https://momentjs.com/docs/#/displaying/format/) for the list of available formats.
     */
    format: PropTypes.string,
    /**
     * The label associated with the underlying [TextInput](#TextInput).
     */
    label: PropTypes.node.isRequired,
    /**
     * A standard language identifier.
     *
     * See [moment.js i18n](https://momentjs.com/docs/#/i18n/) for more details.
     *
     * This property can also be set via a context property and if both are set then the component property takes
     * precedence over the context property.
     *
     * The web browser's locale will be used if no value is set via a component property or a context
     * property.
     */
    locale: PropTypes.string,
    /**
     * Callback fired when one of the menu options gets selected
     */
    onChange: PropTypes.func,
    /**
     * The number of minutes to increment by when generating the allowable options.
     */
    step: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
    /**
     * A timezone identifier in the format: Area/Location
     *
     * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
     * of possible options.
     *
     * This property can also be set via a context property and if both are set then the component property takes
     * precedence over the context property.
     *
     * The web browser's timezone will be used if no value is set via a component property or a context
     * property.
     */
    timezone: PropTypes.string,
    /**
     * An ISO 8601 formatted date string representing the current selected value
     * (must be accompanied by an onChange prop).
     */
    value: CustomPropTypes.controllable(CustomPropTypes.iso8601),
    disabled: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    defaultToFirstOption: false,
    format: 'LT',
    step: 30
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  locale () {
    return this.props.locale || this.context.locale || Locale.browserLocale()
  }

  timezone () {
    return this.props.timezone || this.context.timezone || DateTime.browserTimeZone()
  }

  render () {
    const { defaultToFirstOption, defaultValue, format, label, onChange, step, value, disabled } = this.props
    const locale = this.locale()
    const timezone = this.timezone()

    const ignoredProps = ['defaultOption', 'selectedOption']
    const autocompleteProps = pickProps(this.props, omitProps(Autocomplete.propTypes, {}, ignoredProps))

    const options = this.renderOptions(defaultValue, format, locale, step, timezone, value)
    const defaultOption = this.getDefaultOption(defaultToFirstOption, defaultValue, options)
    const selectedOption = this.getSelectedOption(format, locale, timezone, value)

    return (
      <Autocomplete
        label={label}
        defaultOption={defaultOption}
        selectedOption={selectedOption}
        onChange={onChange}
        disabled={disabled}
        {...autocompleteProps}
      >
        { options }
      </Autocomplete>
    )
  }

  renderOptions (defaultValue, format, locale, step, timezone, value) {
    const date = this.getBaseDateForRendering(defaultValue, locale, timezone, value)
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60 / step; minute++) {
        const minutes = minute * step
        date.hour(hour).minute(minutes)
        options.push(<option key={`${hour}:${minutes}`} value={date.toISOString()}>{date.format(format)}</option>)
      }
    }
    return options
  }

  getBaseDateForRendering (defaultValue, locale, timezone, value) {
    let baseDate
    const baseValue = value || defaultValue
    if (baseValue) {
      baseDate = DateTime.parse(baseValue, locale, timezone)
    } else {
      baseDate = DateTime.now(locale, timezone)
    }
    return baseDate.second(0).millisecond(0)
  }

  // TODO: Change Autocomplete to allow specifying a string for selectedOption (like defaultOption allows)
  getSelectedOption (format, locale, timezone, value) {
    if (!value) {
      return
    }

    return {
      value: value,
      label: DateTime.parse(value, locale, timezone).format(format)
    }
  }

  getDefaultOption (defaultToFirstOption, defaultValue, options) {
    return defaultValue || (defaultToFirstOption ? options[0].props.value : undefined)
  }
}

export default TimeInput
