import React from 'react'
import Spinner from 'react-spinner'
import PropTypes from 'prop-types'
import Delay from './Delay'

const DelayedSpinner = ({ wait }) => (
  <Delay wait={wait}>
    <Spinner
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1
      }}
    />
  </Delay>
)

DelayedSpinner.propTypes = { wait: PropTypes.number }
DelayedSpinner.defaultProps = { wait: 1000 }

export default DelayedSpinner
