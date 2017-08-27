import { PureComponent } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import makeStore from '../redux/store/makeStore'
import { fetchMe } from '../redux/actions/async'
import Layout from '../components/Layout'
import Button from '../components/Button'

class Top extends PureComponent {
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
        Hey, <span>{this.props.user.name}</span>! Welcome to mo!<br />
        <p>mo is CircleCI client for mobile web</p>
        <p>{process.env.TEST}</p>
        <Link href='/dashboard'><a>Dashboard</a></Link>
        <style jsx>{`
          p {
            color: red;
          }
          .test button {
            color: red;
          }
        `}</style>
        <span className='test'><Button style={{ color: 'red' }}>test</Button></span>
        <img
          src='https://cdn.rawgit.com/circleci/media/9617c812/presskit/logos/stacked/logo-stacked-grey.svg'
          style={{
            width: 100,
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Layout>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({ user: state.me.entity }),
  dispatch => bindActionCreators({ fetchMe }, dispatch)
)(Top)
