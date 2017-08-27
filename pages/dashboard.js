import querystring from 'querystring'
import { parse } from 'url'
import { PureComponent } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import Layout from '../components/Layout'
import makeStore from '../redux/store/makeStore'
import { fetchRecentBuilds } from '../redux/actions/async'

class Dashboard extends PureComponent {
  static async getInitialProps({ isServer, req, query, store: { dispatch, getState } }) {
    // console.log('Dashboard query', query)
    if (isServer) {
      await dispatch(fetchRecentBuilds({ req, query: { offset: query && query.page ? query.page : 0 } }))
    }
    return { isServer }
  }
  componentDidMount() {
    if (!this.props.isServer) {
      const parsed = querystring.parse(window.location.search.slice(1))
      this.props.fetchRecentBuilds({ query: { offset: parsed.page || 0 }})
    }
  }
  componentWillReceiveProps({ url: { query } }) {
    if (query.page !== this.props.url.query.page) {
      this.props.fetchRecentBuilds({ query: { offset: parseInt(query.page, 10) }})
    }
  }
  render() {
    const isFirst = !this.props.url.query.page || this.props.url.query.page === '0'
    return (
      <Layout>
        <Link href='/'><a>Top</a></Link>
        <p>Dashboard</p>
        {this.props.loading ? <p>No loading...</p> : (
          <ul>{this.props.builds.map(b => (
            <li key={`${b.vcs_type}-${b.vcs_revision}-${b.build_num}`}>
              <Link prefetch href={
                parse(b.build_url).pathname
              }><a>{b.build_url}</a></Link>
            </li>
          ))}</ul>
        )}
        <ul>
          {isFirst ? null : (
            <li><Link href={{
              query: { page: parseInt(this.props.url.query.page, 10) - 1 }
            }}><a>Prev</a></Link></li>
          )}
          <li><Link href={{
            query: {
              page: this.props.url.query.page ?
                parseInt(this.props.url.query.page, 10) + 1 : 1
            }
          }}><a>Next</a></Link></li>
        </ul>
      </Layout>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({ builds: state.builds.entities, loading: state.builds.isRequesting }),
  dispatch => bindActionCreators({ fetchRecentBuilds }, dispatch)
)(Dashboard)
