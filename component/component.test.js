import React from 'react'
import { shallow } from 'enzyme'

import Component from './component.js'

it('renders without props', () => {
  shallow(<Component />)
})
