import React from 'react'
import Link from 'next/link'

const GlobalHeader = () => {
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
        }
        a {
          width: 40px;
          height: 40px;
          display: inline-block;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      `}
      </style>
      <Link href='/'><a><img src='/static/logo.png' /></a></Link>
    </header>
  )
}

export default GlobalHeader
