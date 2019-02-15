import React from 'react'
import PropTypes from 'prop-types'
import octicons from 'octicons'
import classnames from 'classnames'

const Octicon = ({ name, spin, className, options, ...props }) => (
  <span>
    <style jsx>{`
      .spin {
        animation spin-octicon 2s infinite linear;
      }
      @keyframes spin-octicon {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(359deg);
        }
      }
    `}</style>
    <span
      {...props}
      className={classnames('octicon-container', className, { spin })}
      dangerouslySetInnerHTML={{ __html: octicons[name].toSVG(options) }}
    />
  </span>
)

Octicon.propTypes = {
  name: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  className: PropTypes.string
}

export default Octicon
