import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/layout
---
  Use Container as a wrapper to separate content and/or to set the
  text alignment for a section of content.

  Note the `visualDebug` prop you can set to see the Container's boundaries.

  ```jsx_example
  <Container
    as="div"
    visualDebug
    size="small"
    textAlign="center"
    margin="large auto"
    padding="small"
  >
    <Text as="div">{lorem.sentence()}</Text>
  </Container>
  ```
  ### The `as` prop
  Change the `as` prop to set what element Container should render as.
  In the example below a `<section>` wraps a `<header>` and a paragraph of content.
  The outermost `<section>` Container provides padding for all the content, while
  the header and paragraph are separated by bottom margin from the `<header>` Container.

  ```jsx_example
  <Container
    as="section"
    visualDebug
    padding="small"
  >
    <Container
      as="header"
      visualDebug
      margin="0 0 medium"
    >

      <Grid startAt="medium" vAlign="middle" colSpacing="none">
        <GridRow>
          <GridCol>
            <Heading>My container is a &lt;header&gt;</Heading>
          </GridCol>
          <GridCol width="auto">
            <Button variant="primary">Some action</Button>
          </GridCol>
        </GridRow>
      </Grid>

    </Container>
    <Text as="p">{lorem.paragraph()}</Text>
  </Container>
  ```
  ### Inline Containers

  Setting `display` to `inline`, styles the Container to display
  inline-block with other inline elements.
  ```jsx_example
  <Container as="div" textAlign="center" padding="x-small" visualDebug>
    <Container
      display="inline"
      visualDebug
      size="small"
      textAlign="end"
      margin="large auto"
      padding="0 small 0 0"
    >
      <Text as="div">{lorem.sentence()}</Text>
    </Container>
    <Button variant="success">Some action</Button>
  </Container>
  ```
**/
@themeable(theme, styles)
class Container extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    as: CustomPropTypes.elementType,
    children: PropTypes.node,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Controls the maximum width of the Container
    */
    size: PropTypes.oneOf(['auto', 'x-small', 'small', 'medium', 'large', 'fullscreen']),
    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: CustomPropTypes.spacing,
    /**
    * Set the padding using familiar CSS shorthand
    */
    padding: CustomPropTypes.spacing,
    /**
    * By default the Container is a block-level element
    */
    display: PropTypes.oneOf([null, 'block', 'inline']),
    /**
    * Activate a dotted line around the Container to make building your
    * layout easier
    */
    visualDebug: PropTypes.bool,

    /**
    * provides a reference to the underlying html element
    */
    elementRef: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    display: null
  }

  renderSpacingStyles (spacingFromProps, spacingFromTheme) {
    if (typeof spacingFromProps !== 'string') {
      return null
    }

    const spacing = spacingFromProps.split(' ')
    const spacingStyle = []

    for (let i = 0; i < spacing.length; i++) {
      const style = spacingFromTheme[spacing[i]]
      if (style) {
        spacingStyle.push(style)
      }
    }

    return spacingStyle.join(' ')
  }

  get paddingFromTheme () {
    return {
      0: '0',
      none: '0',
      'xxx-small': this.theme.paddingxxxSmall,
      'xx-small': this.theme.paddingxxSmall,
      'x-small': this.theme.paddingxSmall,
      small: this.theme.paddingSmall,
      medium: this.theme.paddingMedium,
      large: this.theme.paddingLarge,
      'x-large': this.theme.paddingxLarge,
      'xx-large': this.theme.paddingxxLarge
    }
  }

  get marginFromTheme () {
    return {
      auto: 'auto',
      0: '0',
      none: '0',
      'xxx-small': this.theme.marginxxxSmall,
      'xx-small': this.theme.marginxxSmall,
      'x-small': this.theme.marginxSmall,
      small: this.theme.marginSmall,
      medium: this.theme.marginMedium,
      large: this.theme.marginLarge,
      'x-large': this.theme.marginxLarge,
      'xx-large': this.theme.marginxxLarge
    }
  }

  render () {
    const { children, textAlign, display, visualDebug, size, padding, margin } = this.props

    const classes = {
      [styles.root]: true,
      [styles[display]]: display !== null,
      [styles.visualDebug]: visualDebug,
      [styles[`textAlign--${textAlign}`]]: textAlign,
      [styles[size]]: size,
      [styles.hasPadding]: padding,
      [this.props.className]: this.props.className // eslint-disable-line react/prop-types
    }

    const style = {
      ...this.props.style, // eslint-disable-line react/prop-types
      margin: this.renderSpacingStyles(margin, this.marginFromTheme),
      padding: this.renderSpacingStyles(padding, this.paddingFromTheme)
    }

    const ElementType = getElementType(Container, this.props)

    return (
      <ElementType
        {...omitProps(this.props, Container.propTypes)}
        className={classnames(classes)}
        style={style}
        ref={this.props.elementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default Container
