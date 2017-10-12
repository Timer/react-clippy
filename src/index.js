import React, { PureComponent } from 'react'

import Agent from './agents/clippy/agent'
import map from '../assets/clippy.map.png'

import Animator from './Animator'

export default class Clippy extends PureComponent {
  render() {
    const { animation, repeat, ...rest } = this.props
    const { framesize: [width, height], animations } = Agent
    return (
      <Animator
        width={width}
        height={height}
        spriteUrl={map}
        animations={animations}
        animation={animation}
        repeat={repeat}
      />
    )
  }
}
