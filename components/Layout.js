import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Error from 'next/error'
import Spinner from 'react-spinner'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import stylesheet from 'styles/index.css'
import GlobalHeader from './GlobalHeader'
import SideMenu from './SideMenu'
import Delay from './Delay'
import { closeSidemenu, toggleSidemenu } from '../redux/actions'

class Layout extends PureComponent {
  static get defaultProps() {
    return { baseTitle: 'mo - CircleCI client for mobile web' }
  }
  componentWillMount() {
    if (!this.props.signedIn) {
      this.props.closeSidemenu()
      this.props.router.replace('/authorize')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.signedIn === true && nextProps.signedIn === false) {
      this.props.closeSidemenu()
      this.props.router.replace('/authorize')
    }
  }
  renderError(statusCode) {
    return <Error statusCode={statusCode} />
  }
  renderMain() {
    const { toggleSidemenu, isSidemenuOpen, children, isServer, showBackButton, buildUrl, hideMenuButton } = this.props
    return (
      <div id='container'>
        <style jsx>{`
          main {
            padding-top: 50px;
          }
        `}</style>
        <GlobalHeader
          toggleSidemenu={toggleSidemenu}
          isSidemenuOpen={isSidemenuOpen}
          isServer={isServer}
          showBackButton={showBackButton}
          hideMenuButton={hideMenuButton}
        />
        <main id='main'>{children}</main>
        <SideMenu isOpen={isSidemenuOpen} buildUrl={buildUrl} />
      </div>
    )
  }
  renderSpinner() {
    return (
      <Delay wait={1000}>
        <Spinner style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 1,
        }} />
      </Delay>
    )
  }
  render() {
    const { children, title, baseTitle } = this.props
    return (
      <div>
        <Head>
          <meta charSet='utf-8' />
          <title>{`${title ? `${title} | ` : ''}${baseTitle}`}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='shortcut icon' href='/static/favicon.png' />
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'
            integrity='sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ'
            crossOrigin='anonymous'
          />
        </Head>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {(this.props.loading && this.renderSpinner()) || (
          this.props.error ? this.renderError(this.props.error.status) : this.renderMain()
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    signedIn: !!state.auth.token,
    error: state.build.error || state.builds.error || state.me.error,
    loading: Object.values(state).some(s => s.isRequesting),
    isSidemenuOpen: !!state.sidemenu.isOpen,
  }),
  dispatch => bindActionCreators({ closeSidemenu, toggleSidemenu }, dispatch)
)(
  withRouter(Layout)
)
