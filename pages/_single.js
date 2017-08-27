import { PureComponent } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import makeStore from '../redux/store/makeStore'
import { fetchSingleBuild } from '../redux/actions/async'
import Layout from '../components/Layout'
import Button from '../components/Button'

class Single extends PureComponent {
  static async getInitialProps({ isServer, req, store: { dispatch, getState } }) {
    if (isServer) {
      console.log('req.url', req.url)
      await dispatch(fetchSingleBuild({ req, url: req.url }))
    }
    return { isServer }
  }
  componentDidMount() {
    console.log('this.props.location', window.location.pathname)
    if (!this.props.isServer) {
      this.props.fetchSingleBuild({ url: window.location.pathname })
    }
  }
  render() {
    console.log('this.props.build', this.props.build)
    return (
      <Layout>
        <Link href='/dashboard'><a>Dashboard</a></Link>
        <p>Single</p>
        <p>this.props.build.status {this.props.build.status}</p>
      </Layout>
    )
  }
}

// export default withRouter(
//   withRedux(
//     makeStore,
//     state => ({ build: state.build.entity }),
//     dispatch => bindActionCreators({ fetchSingleBuild }, dispatch)
//   )(Single)
// )
export default withRedux(
  makeStore,
  state => ({ build: state.build.entity }),
  dispatch => bindActionCreators({ fetchSingleBuild }, dispatch)
)(Single)
