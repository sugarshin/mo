import React from 'react'
import { Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import getYear from 'date-fns/get_year'
import { signout, rebuild, cancelBuild, rebuildWithoutCache } from '../redux/actions/async'

const SideMenu = ({ signout, rebuild, cancelBuild, rebuildWithoutCache, isOpen, buildUrl, token }) => {
  return (
    <aside className={classnames({ open: isOpen })}>
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
        .open {
          transform: translateX(0);
        }
        .copyright {
          margin-top: 1em;
          text-align: center;
        }
      `}</style>
      <ListGroup>
        {buildUrl ? [
          <ListGroupItem key='rebuild' onClick={rebuild}>Rebuild</ListGroupItem>,
          <ListGroupItem key='rebuild-withou-cache' onClick={rebuildWithoutCache}>Rebuild without cache</ListGroupItem>,
          <ListGroupItem key='cancel' onClick={cancelBuild}>Cancel</ListGroupItem>,
        ] : null}
        <ListGroupItem onClick={signout}>Signout</ListGroupItem>
        <ListGroupItem>
          <Label>Token</Label>
          <Input type='text' disabled value={token} />
        </ListGroupItem>
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
  state => ({ token: state.auth.token }),
  (dispatch, { buildUrl }) => bindActionCreators({
    signout,
    rebuild: () => rebuild(buildUrl),
    cancelBuild: () => cancelBuild(buildUrl),
    rebuildWithoutCache: () => rebuildWithoutCache(buildUrl),
  }, dispatch)
)(SideMenu)
