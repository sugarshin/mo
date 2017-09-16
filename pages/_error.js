import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import HTTPStatus from 'http-status'
import makeStore from '../redux/store/makeStore'
import Layout from '../components/Layout'
import GlobalHeader from '../components/GlobalHeader'
import SideMenu from '../components/SideMenu'
import ErrorContent from '../components/Error'
import { toggleSidemenu } from '../redux/actions'

const Error = ({ statusCode, isServer, toggleSidemenu }) => (
  <Layout title={`${statusCode} ERROR`}>
    <GlobalHeader
      toggleSidemenu={toggleSidemenu}
      isServer={isServer}
      hideMenuButton
    />
    <ErrorContent statusCode={statusCode} />
    <SideMenu isOpen={false} />
  </Layout>
)

Error.getInitialProps = ({ res, isServer, err }) => {
  const statusCode = res ? res.statusCode : (err ? err.statusCode : null)
  return { statusCode, isServer }
}

Error.propTypes = { statusCode: PropTypes.number }

export default withRedux(
  makeStore,
  null,
  dispatch => bindActionCreators({ toggleSidemenu }, dispatch)
)(
  withRouter(Error)
)
