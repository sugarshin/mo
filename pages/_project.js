import { PureComponent } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import makeStore from '../redux/store/makeStore'
import { fetchMe } from '../redux/actions/async'
import Layout from '../components/Layout'
import Button from '../components/Button'

class Project extends PureComponent {
  static async getInitialProps({ isServer, req, store: { dispatch, getState } }) {
    if (isServer) {
      await dispatch(fetchMe({ req }))
    }
    return { isServer }
  }
  componentDidMount() {
    if (!this.props.isServer) {
      this.props.fetchMe()
    }
  }
  render() {
    return (
      <Layout>
        <Link href='/dashboard'><a>Dashboard</a></Link>
        <p>Project</p>
      </Layout>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({ user: state.me.entity }),
  dispatch => bindActionCreators({ fetchMe }, dispatch)
)(Project)
