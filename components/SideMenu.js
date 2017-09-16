import React from 'react'
import { withRouter } from 'next/router'
import { Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import Avatar from 'react-avatar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import getYear from 'date-fns/get_year'
import { rebuild, cancelBuild, rebuildWithoutCache } from '../redux/actions/async'
import { signout } from '../redux/actions'

const SideMenu = ({
  signout,
  rebuild,
  cancelBuild,
  rebuildWithoutCache,
  isOpen,
  token,
  avatarUrl,
  username,
  router
}) => {
  return (
    <aside className={classnames('global-sidemenu', { open: isOpen })}>
      <style jsx>{`
        aside {
          position: fixed;
          top: 50px;
          right: 0;
          height: 100%;
          transform: translateX(100%);
          width: 50%;
          max-width: 320px;
          transition: transform .2s;
          background: #002B36;
          border-left: 1px solid;
          overflow: auto;
          z-index: 4;
        }
        :global(.global-sidemenu .user.list-group-item) {
          display: flex;
          align-items: center;
          justify-content: start;
        }
        :global(.global-sidemenu .user.list-group-item .sb-avatar) {
          margin-right: .5rem;
        }
        .open {
          transform: translateX(0);
        }
        .copyright {
          margin-top: 1em;
          text-align: center;
        }
        .username {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
      <ListGroup>
        {router.pathname === '/build' ? [
          <ListGroupItem key='rebuild' onClick={rebuild}>Rebuild</ListGroupItem>,
          <ListGroupItem key='cancel' onClick={cancelBuild}>Cancel</ListGroupItem>,
          <ListGroupItem key='rebuild-withou-cache' onClick={rebuildWithoutCache}>Rebuild without cache</ListGroupItem>,
        ] : null}
        <ListGroupItem key='user' className='user'>
          <Avatar src={avatarUrl} size={32} round />
          <span className='username'>{username}</span>
        </ListGroupItem>
        <ListGroupItem>
          <Label>Token</Label>
          <Input type='text' disabled value={token || ''} />
        </ListGroupItem>
        <ListGroupItem onClick={signout}>Signout</ListGroupItem>
      </ListGroup>
      <div className='copyright'>
        <small>
          {`@ ${getYear(new Date())} mo | `}<a href='https://sugarshin.net/' target='_blank'>@sugarshin</a>
        </small>
      </div>
    </aside>
  )
}

export default connect(
  state => ({
    token: state.auth.token,
    avatarUrl: state.me.entity.avatar_url,
    username: state.me.entity.login,
  }),
  (dispatch, { buildUrl }) => bindActionCreators({
    signout,
    rebuild: () => rebuild(buildUrl),
    cancelBuild: () => cancelBuild(buildUrl),
    rebuildWithoutCache: () => rebuildWithoutCache(buildUrl),
  }, dispatch)
)(
  withRouter(SideMenu)
)
