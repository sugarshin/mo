import { parse } from 'url'
import React, { PureComponent } from 'react'
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from 'reactstrap'
import Link from 'next/link'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import Main from '../components/Main'
import Octicon from '../components/Octicon'
import makeStore from '../redux/store/makeStore'
import { fetchRecentBuilds, fetchMe } from '../redux/actions/async'

class Top extends PureComponent {
  static async getInitialProps({ isServer, req, query, store: { dispatch, getState } }) {
    await dispatch(fetchRecentBuilds({ req, query: { offset: query && (query.page ? query.page : 0) * 20 } }))
    if (isServer) {
      await dispatch(fetchMe({ req }))
    }
    return { isServer }
  }
  getBadgeColor(outcome) {
    switch (outcome) {
      case 'failed':
      case 'infrastructure_fail':
      case 'timedout':
        return 'danger'
      case 'not_run':
      case 'canceled':
        return 'default'
      case 'success':
      case 'fixed':
        return 'success'
      case 'no_tests':
        return 'warning'
      case 'retried':
      case 'running':
      case 'queued':
      case 'scheduled':
      case 'not_running':
      default:
        return 'info'
    }
  }
  render() {
    const { page } = this.props.url.query
    const isFirst = !page || page === '0'
    return (
      <Main isServer={this.props.isServer}>
        <style jsx>{`
          :global(.pagination.build-navs) {
            padding: 0 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          ul {
            margin: 1rem 0;
            list-style: none;
            padding: 0;
          }
          li {
            margin: .5rem 0;
          }
          a.cell {
            display: block;
            width: 100%;
            padding: .5rem;
            color: #839496;
            text-decoration: none;
          }
          .content {
            max-width: calc(100% - 45px);
          }
          :global(.build-list.list-group) {
            margin-bottom: 1rem;
          }
          :global(.build-list .list-group-item) {
            padding: 0;
          }
          :global(.build-list .list-group-item-heading) {
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          :global(.build-list .list-group-item-text) {
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .platform {
            display: block;
            position: absolute;
            z-index: 1;
            height: 100%;
            right: 25px;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .arrow {
            display: block;
            position: absolute;
            z-index: 1;
            height: 100%;
            right: 0;
            top: 0;
            color: #002b36;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 15px;
            text-align: center;
            background: #839496;
          }
          :global(.build-navs .page-link) {
            padding: 0;
          }
          :global(.build-navs .page-link a) {
            padding: 0.5rem 0.75rem;
            display: block;
          }
        `}</style>
        <ListGroup className='build-list'>
          {this.props.builds.map(b => (
            <ListGroupItem key={`${b.vcs_type}-${b.vcs_revision}-${b.build_num}`}>
              <Link href={`/build?url=${parse(b.build_url).pathname}`}>
                <a className='cell'>
                  <Badge color={this.getBadgeColor(b.status)} pill>
                    {b.dont_build ? b.dont_build : b.status}
                  </Badge>{' '}
                  <span>{`#${b.build_num}`}</span>
                  <div className='content'>
                    <ListGroupItemHeading>
                      <span>{`${b.username} / ${b.reponame}`}</span>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <span>{b.subject}</span>
                    </ListGroupItemText>
                  </div>
                  <span className='platform'>{b.platform}</span>
                  <span className='arrow'><Octicon name='chevron-right' /></span>
                </a>
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Pagination className='build-navs'>
          <PaginationItem disabled={isFirst}>
            <PaginationLink previous tag='span'>
              {isFirst ? null : (
                <Link
                  href={{ query: { page: Math.max(parseInt(page, 10) - 1, 0) } }}
                >
                  <a>«</a>
                </Link>
              )}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next tag='span'>
              <Link
                href={{ query: { page: page ? parseInt(page, 10) + 1 : 1 } }}
              >
                <a>»</a>
            </Link>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Main>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({ builds: state.builds.entities }),
  dispatch => bindActionCreators({ fetchRecentBuilds }, dispatch)
)(Top)
