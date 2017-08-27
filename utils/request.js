import 'isomorphic-fetch'

const request = async (url, options) => {
  const res = await fetch(url, options)
  const body = await res.json()
  if (res.ok) {
    return body
  }
  const e = new Error(body.message)
  e.status = res.status
  e.statusText = res.statusText
  e.url = res.url
  throw e
}

export default request
