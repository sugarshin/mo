import { PureComponent } from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { FormGroup, Label, InputGroup, InputGroupButton, Input } from 'reactstrap'
import makeStore from '../redux/store/makeStore'
import { authorize } from '../redux/actions'
import Layout from '../components/Layout'
import Button from '../components/Button'

class Authorize extends PureComponent {
  static async getInitialProps({ isServer, req, store: { dispatch, getState } }) {
    return { isServer }
  }
  state = {
    token: '',
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.authorized === false && nextProps.authorized === true) {
      const { location } = window
      const pathname = location.pathname === '/authorize' ? '/' : location.href
      location.assign(pathname)
    }
  }
  handleTokenChange = e => this.setState({ token: e.target.value })
  handleAuth = () => this.props.authorize(this.state.token)
  render() {
    return (
      <Layout isServer={this.props.isServer} hideMenuButton>
        <style jsx>{`
          .container {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 1;
          }
          :global(#token) {
            border: 0;
          }
        `}</style>
        <div className='container'>
          <div>
            <FormGroup>
              <Label for='token'>API Token</Label>
              <InputGroup>
                <Input type='password' name='password' id='token' onChange={this.handleTokenChange} value={this.state.token} />
                <InputGroupButton><Button size='sm' onClick={this.handleAuth}>Authorize</Button></InputGroupButton>
              </InputGroup>
              {/* <Input type='password' name='password' id='token' onChange={this.handleTokenChange} value={this.state.token} /> */}
            </FormGroup>
            {/* <Button onClick={this.handleAuth}>Autorize</Button> */}
          </div>
        </div>
      </Layout>
    )
    // return (
    //   <div>
    //     <Head>
    //       <title>mo - CircleCI client for mobile web</title>
    //       <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    //     </Head>
    //     <p>Authorize</p>
    //     <FormGroup>
    //       <Label for='token'>API Token</Label>
    //       <Input type='password' name='password' id='token' onChange={this.handleTokenChange} value={this.state.token} />
    //     </FormGroup>
    //     <Button onClick={this.handleAuth}>Autorize</Button>
    //   </div>
    // )
  }
}

export default withRedux(
  makeStore,
  state => ({ authorized: !!state.auth.token }),
  dispatch => bindActionCreators({ authorize }, dispatch)
)(Authorize)
