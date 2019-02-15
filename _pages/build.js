import querystring from 'querystring'
import { PureComponent } from 'react'
import Spinner from 'react-spinner'
import Ansi from 'ansi-to-react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import makeStore from '../redux/store/makeStore'
import {
  fetchSingleBuild,
  pollFetchSingleBuild,
  fetchSteps,
  fetchMe
} from '../redux/actions/async'
import { closeSidemenu, resetBuild } from '../redux/actions'
import Main from '../components/Main'
import Button from '../components/Button'
import Octicon from '../components/Octicon'

class Build extends PureComponent {
  static async getInitialProps({
    isServer,
    req,
    query,
    store: { dispatch, getState }
  }) {
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
          return {
            name: step.name,
            url: step.actions[0].has_output ? step.actions[0].output_url : null
          }
        })
      )
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.isCancelRequesting === true &&
        nextProps.isCancelRequesting === false) ||
      (this.props.isRebuildRequesting === true &&
        nextProps.isRebuildRequesting === false)
    ) {
      this.props.closeSidemenu()
      this.props.router.push('/')
    }
  }
  render() {
    return (
      <Main isServer={this.props.isServer} showBackButton>
        <style jsx>{`
          .single-build-container {
            padding: 10px 0;
          }
          :global(.single-build-container .title .title-chevron) {
            line-height: 1;
            vertical-align: middle;
            display: inline-block;
            margin-right: 0.2rem;
          }
          .single-build {
            padding: 0 10px;
          }
          .single-build pre.content {
            border-radius: 0.25rem;
            padding: 10px;
            opacity: 0.6;
            -webkit-overflow-scrolling: touch;
            color: #839496;
            background: #000;
          }
          .title {
            margin: 10px 0 5px;
            padding: 5px 10px 5px 0;
            border-radius: 5px;
            font-weight: bold;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          h5 {
            text-align: center;
            margin-top: 1rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
            padding: 0 10px;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
          }
        `}</style>
        {this.props.isCancelRequesting || this.props.isRebuildRequesting ? (
          <div className="overlay">
            <Spinner
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 5
              }}
            />
          </div>
        ) : null}
        <h5>{`${this.props.build.username} / ${this.props.build.reponame} / ${
          this.props.build.branch
        } / #${this.props.build.build_num}`}</h5>
        {this.props.build.vcs_revision ? (
          <div className="single-build-container">
            {this.props.steps.map((s, i) => {
              return (
                <div className="single-build" key={`${s.name}${s.url || i}`}>
                  <h6 className="title">
                    <Octicon name="chevron-right" className="title-chevron" />
                    {s.name}
                  </h6>
                  <pre className="content">
                    {s.message === '' ? (
                      <code>{s.name}</code>
                    ) : (
                      <Ansi>{s.message}</Ansi>
                    )}
                  </pre>
                </div>
              )
            })}
          </div>
        ) : null}
      </Main>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({
    build: state.build.entity,
    steps: state.steps.entities,
    isCancelRequesting: state.build.isCancelRequesting,
    isRebuildRequesting: state.build.isRebuildRequesting
  }),
  dispatch =>
    bindActionCreators(
      { resetBuild, pollFetchSingleBuild, fetchSteps, closeSidemenu },
      dispatch
    )
)(withRouter(Build))
