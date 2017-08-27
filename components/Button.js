import React from 'react'
import { Button as BSButton } from 'reactstrap'
import PropTypes from 'prop-types'

const Button = ({
  children,
  color,
  block,
  tag,
  className,
  ...rest,
}) => <BSButton {...rest} className={className} color={color} block={block} tag={tag}>
  {children}
</BSButton>

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
  block: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default Button
