import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Delay extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      wait: PropTypes.number
    }
  }
  static get defaultProps() {
    return { wait: 250 }
  }
  constructor(...args) {
    super(...args)
    this.state = { waiting: true }
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ waiting: false })
    }, this.props.wait)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render() {
    if (!this.state.waiting) {
      return this.props.children
    }
    return null
  }
}
