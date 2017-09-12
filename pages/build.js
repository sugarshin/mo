import querystring from 'querystring'
import { parse } from 'url'
import { PureComponent } from 'react'
import Spinner from 'react-spinner'
import Link from 'next/link'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import makeStore from '../redux/store/makeStore'
import { fetchSingleBuild, pollFetchSingleBuild, fetchSteps, fetchMe } from '../redux/actions/async'
import { closeSidemenu, resetBuild } from '../redux/actions'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Octicon from '../components/Octicon'

class Build extends PureComponent {
  static async getInitialProps({ isServer, req, query, store: { dispatch, getState } }) {
    await dispatch(fetchSingleBuild({ req, url: query.url }))
    if (isServer) {
      await dispatch(fetchMe({ req }))
    }
    return { isServer }
  }
  componentWillUnmount() {
    // clearInterval(this.timer)
    this.props.resetBuild()
  }
  componentDidMount() {
    // if (this.props.build.outcome === null) {
    //   this.timer = setInterval(() => this.props.pollFetchSingleBuild({ url: Router.query.url }), 1000)
    // }
    if (this.props.build.steps) {
      this.props.fetchSteps(
        this.props.build.steps.map(step => {
          return { name: step.name, url: step.actions[0].has_output ? step.actions[0].output_url : null}
        })
      )
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.isCancelRequesting === true && nextProps.isCancelRequesting === false) ||
      (this.props.isRebuildRequesting === true && nextProps.isRebuildRequesting === false)
    ) {
      this.props.closeSidemenu();
      this.props.router.push('/');
    }
  }
  render() {
    return (
      <Layout
        buildUrl={parse(this.props.build.build_url).pathname}
        isServer={this.props.isServer}
        showBackButton
      >
        <style jsx>{`
          .container {
            padding: 10px 0;
          }
          pre {
            border-radius: 0.25rem;
          }
          pre code {
            color: #666;
          }
          .s {
            padding: 0 10px;
          }
          .s pre {
            padding: 10px;
            background: #000;
            opacity: .6;
            -webkit-overflow-scrolling: touch;
          }
          .title {
            background: #000;
            opacity: .6;
            margin: 10px 0 5px;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;
            overflow: auto;
          }
          h4 {
            text-align: center;
            margin-top: 1rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
        `}</style>
        {this.props.isCancelRequesting || this.props.isRebuildRequesting ? (
          <Spinner style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 5,
          }} />
        ) : null}
        <h4>{`${this.props.build.username} / ${this.props.build.reponame} #${this.props.build.build_num}`}</h4>
        {this.props.build.vcs_revision ? (
          <div className='container'>{this.props.steps.map((s, i)=> {
            return <div className='s' key={`${s.name}${s.url || i}`}>
              <div className='title'>{s.name}</div>
              <pre><code>{s.message === '' ? s.name : s.message}</code></pre>
            </div>
          })}</div>
        ) : null}
      </Layout>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({
    build: state.build.entity,
    steps: state.steps.entities,
    isCancelRequesting: state.build.isCancelRequesting,
    isRebuildRequesting: state.build.isRebuildRequesting,
  }),
  dispatch => bindActionCreators({ resetBuild, pollFetchSingleBuild, fetchSteps, closeSidemenu }, dispatch)
)(
  withRouter(Build)
)
