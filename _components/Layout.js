import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import stylesheet from 'styles/index.css'

const Layout = ({ children, title, baseTitle }) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <title>{`${title ? `${title} | ` : ''}${baseTitle}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </Head>
    {children}
  </div>
)

Layout.defaultProps = {
  baseTitle: 'mo - CircleCI client for mobile web'
}

export default Layout
