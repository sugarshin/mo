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
import Layout from '../components/Layout'
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
      case 'failed': return 'danger'
      case 'canceled': return 'default'
      case 'success': return 'success'
      default: return 'info'
    }
  }
  render() {
    const { page } = this.props.url.query
    const isFirst = !page || page === '0'
    return (
      <Layout isServer={this.props.isServer}>
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
          :global(.build-list.list-group) {
            margin-bottom: 1rem;
          }
          :global(.build-list .list-group-item) {
            padding: 0;
          }
          :global(.build-list .list-group-item-heading) {
            margin: 0;
          }
          :global(.build-list .list-group-item-text) {
            margin: 0;
          }
          .platform {
            display: block;
            position: absolute;
            z-index: 1;
            height: 100%;
            right: 30px;
            top: 0;
            padding-top: 35px;
          }
          .arrow {
            display: block;
            position: absolute;
            z-index: 1;
            height: 100%;
            right: 0;
            top: 0;
            color: #002b36;
            padding-top: 38px;
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
                  <Badge color={this.getBadgeColor(b.outcome)} pill>{b.outcome || 'running'}</Badge>{' '}
                  <span>{`#${b.build_num}`}</span>
                  <ListGroupItemHeading>
                    <span>{`${b.username} / ${b.reponame}`}</span>
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    <span>{b.subject}</span>
                  </ListGroupItemText>
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
      </Layout>
    )
  }
}

export default withRedux(
  makeStore,
  state => ({ builds: state.builds.entities }),
  dispatch => bindActionCreators({ fetchRecentBuilds }, dispatch)
)(Top)
