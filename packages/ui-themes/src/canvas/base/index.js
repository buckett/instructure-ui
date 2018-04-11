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

import { registerTheme, makeTheme } from '@instructure/ui-themeable/lib/registry'
import KEYS from '../../keys'

import borders from './borders'
import colors from './colors'
import transitions from './transitions'
import typography from './typography'
import spacing from './spacing'
import forms from './forms'
import media from './media'
import breakpoints from './breakpoints'
import shadows from './shadows'
import stacking from './stacking'

const key = KEYS.CANVAS

const variables = {
  borders,
  colors,
  transitions,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,
  stacking
}

export const brandVariables = {
  /* Defaults for Canvas account branding variables: */
  'ic-brand-primary': colors.brand,
  'ic-brand-font-color-dark': colors.licorice,

  'ic-link-color': colors.brand,

  'ic-brand-button--primary-bgd': colors.brand,
  'ic-brand-button--primary-text': colors.textLightest,
  'ic-brand-button--secondary-bgd': colors.licorice,
  'ic-brand-button--secondary-text': colors.textLightest
}

const theme = {
  key,
  variables
}

// register the brand variables but don't export them because we don't want canvas-high-contrast to inherit them
registerTheme({ key, variables: { ...variables, ...brandVariables } })

export default makeTheme({ theme })
