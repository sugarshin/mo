import React, { PureComponent } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getYear from 'date-fns/get_year'
import GlobalHeader from './GlobalHeader'
import { signout } from '../redux/actions'
import stylesheet from 'styles/index.css'

const Layout = ({ signout, children, title, baseTitle = 'mo - CircleCI client for mobile web' }) => {
  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <title>{`${title ? `${title} | ` : ''}${baseTitle}`}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'
          integrity='sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ'
          crossOrigin='anonymous'
        />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style jsx>{`
        main {
          padding-top: 50px;
        }
      `}</style>
      <GlobalHeader />
      <main>{children}</main>
      <aside>
        <a onClick={() => {
          signout()
          Router.push('/authorize')
        }}>Signout</a>
      </aside>
      <footer>{`@ ${getYear(new Date())} mo | `}<a href='https://sugarshin.net/' target='_blank'>@sugarshin</a></footer>
    </div>
  )
}

export default connect(
  null,
  dispatch => bindActionCreators({ signout }, dispatch)
)(Layout)
