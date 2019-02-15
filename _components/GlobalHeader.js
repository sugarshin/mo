import React, { PureComponent } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Button from './Button'
import Octicon from './Octicon'

class GlobalHeader extends PureComponent {
  render() {
    const {
      toggleSidemenu,
      isSidemenuOpen,
      isServer,
      showBackButton,
      hideMenuButton,
      router
    } = this.props
    return (
      <header>
        <style jsx>{`
          header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid;
            background-color: #002b36;
            z-index: 4;
          }
          a {
            width: 40px;
            height: 40px;
            display: inline-block;
          }
          img {
            max-width: 100%;
            height: auto;
            opacity: 0.6;
          }
          .global-back-button {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1;
          }
          :global(.global-back-button .btn) {
            padding: 0.2rem 0.6rem;
            background: none;
            border-width: 1px;
            opacity: 0.6;
          }
          :global(.global-back-button .btn):hover {
            background: none;
          }
          .global-menu-button {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1;
          }
          :global(.global-menu-button .btn) {
            padding: 0.2rem 0.5rem;
            background: none;
            border-width: 1px;
            opacity: 0.6;
          }
          :global(.global-menu-button .btn):hover {
            background: none;
          }
        `}</style>
        {showBackButton && (
          <span className="global-back-button">
            <Button
              onClick={() => {
                if (isServer) {
                  router.push('/')
                } else {
                  router.back()
                }
              }}
            >
              <Octicon name="chevron-left" />
            </Button>
          </span>
        )}
        <Link href="/">
          <a>
            <img src="/static/logo.png" />
          </a>
        </Link>
        {!hideMenuButton && (
          <span className="global-menu-button">
            <Button onClick={toggleSidemenu}>
              <Octicon name={isSidemenuOpen ? 'x' : 'three-bars'} />
            </Button>
          </span>
        )}
      </header>
    )
  }
}

export default withRouter(GlobalHeader)
