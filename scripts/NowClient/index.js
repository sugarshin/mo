require('isomorphic-fetch')

module.exports = class NowClient {
  constructor(token) {
    if (!token) {
      throw new Error('token must be required')
    }
    this._token = token;
  }
  get origin() {
    return 'https://api.zeit.co'
  }
  get token() {
    return this._token;
  }
  get header() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    }
  }
  async request(pathname, opts) {
    try {
      const res = await fetch(`${this.origin}${pathname}`, {
        headers: this.header,
        ...opts,
      })
      return await res.json()
    } catch (e) {
      throw e
    }
  }

  async getDeployments() {
    const res = await this.request('/v2/now/deployments')
    return res.deployments
  }
  async getAliases() {
    const res = await this.request('/v2/now/aliases')
    return res.aliases
  }
  async deleteDeployment(uid) {
    return await this.request(`/v2/now/deployments/${uid}`, { method: 'DELETE' })
  }
}
