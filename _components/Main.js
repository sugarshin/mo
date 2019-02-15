import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeSidemenu, toggleSidemenu } from '../redux/actions'
import Layout from './Layout'
import GlobalHeader from './GlobalHeader'
import SideMenu from './SideMenu'
import Error from './Error'
import DelayedSpinner from './DelayedSpinner'

class Main extends PureComponent {
  static get defaultProps() {
    return { baseTitle: 'mo - CircleCI client for mobile web' }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.signedIn === true && nextProps.signedIn === false) {
      this.props.closeSidemenu()
      this.props.router.replace('/authorize')
    }
  }
  render() {
    const {
      title,
      toggleSidemenu,
      isSidemenuOpen,
      children,
      isServer,
      showBackButton,
      hideMenuButton,
      router: { query }
    } = this.props
    return (
      <Layout title={title}>
        <div id="container">
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
          {this.props.error ? (
            <Error statusCode={this.props.error.status} />
          ) : this.props.loading ? (
            <DelayedSpinner />
          ) : (
            <main id="main">{children}</main>
          )}
          <SideMenu isOpen={isSidemenuOpen} buildUrl={query.url} />
        </div>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    signedIn: !!state.auth.token,
    error: state.build.error || state.builds.error || state.me.error,
    loading: Object.values(state).some(s => s.isRequesting),
    isSidemenuOpen: !!state.sidemenu.isOpen
  }),
  dispatch => bindActionCreators({ closeSidemenu, toggleSidemenu }, dispatch)
)(withRouter(Main))
