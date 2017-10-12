import React, { PureComponent } from 'react'

export default class Animator extends PureComponent {
  state = { animation: null, frame: 0 }

  constructor(props) {
    super(props)
    this.state = this.getAnimationState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getAnimationState(nextProps))
  }

  getAnimationState = props => {
    const { animation: current } = this.state
    const { animation, animations } = props

    if (animation != current) {
      return {
        animation: animations.hasOwnProperty(animation) ? animation : null,
        frame: 0,
      }
    }
    return null
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  pendingTimeout = null

  componentDidUpdate() {
    const { repeat, animations } = this.props
    const { animation, frame } = this.state
    if (animation == null) {
      return
    }

    const { frames } = animations[animation]
    const { duration } = frames[frame]

    const nextFrame = frame < frames.length - 1 ? frame + 1 : repeat ? 0 : -1
    if (this.pendingTimeout != null) {
      clearTimeout(this.pendingTimeout)
    }

    if (nextFrame < 0) {
      return
    }

    this.pendingTimeout = setTimeout(() => {
      this.pendingTimeout = null
      this.setState(
        prev =>
          prev.animation === animation && prev.frame === prev.frame
            ? { frame: nextFrame }
            : null
      )
    }, duration)
  }

  render() {
    const { width, height, spriteUrl, animations } = this.props

    const { animation, frame } = this.state
    let x = -1,
      y = -1
    if (animation) {
      const { images } = animations[animation].frames[frame]
      if (images != null) {
        ;[[x, y]] = images
      }
    }
    return (
      <div
        style={{
          display: x < 0 || y < 0 ? 'none' : undefined,
          width,
          height,
          backgroundImage: `url(${spriteUrl})`,
          backgroundPosition: animation != null ? `${-x}px ${-y}px` : null,
          backgroundRepeat: 'no-repeat',
        }}
      />
    )
  }
}
