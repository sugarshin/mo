import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HTTPStatus from 'http-status'
import Button from './Button'

const Error = ({ statusCode, router }) => {
  const title = statusCode === 404
    ? 'This page could not be found'
    : HTTPStatus[statusCode] || 'An unexpected error has occurred'

  return (
    <div style={styles.error}>
      <div>
        {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
        <div style={styles.desc}>
          <h2 style={styles.h2}>{title}.</h2>
        </div>
        {statusCode === 401 ? <div style={styles.authButton}>
          <Button size='sm' href='/authorize'>Authorize</Button>
        </div> : null}
      </div>
    </div>
  )
}

const styles = {
  error: {
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle',
  },
  h1: {
    display: 'inline-block',
    borderRight: '1px solid',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top',
  },
  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
  },
  authButton: {
    margin: '1rem 0',
  },
}

export default Error
