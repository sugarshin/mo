// import 'isomorphic-fetch'
import querystring from 'querystring'
import request from '../../utils/request'
import {
  fetchMeRequest,
  fetchMeReceive,
  fetchProjectsRequest,
  fetchProjectsReceive,
  fetchRecentBuildsRequest,
  fetchRecentBuildsReceive,
  fetchSingleBuildRequest,
  fetchSingleBuildReceive
} from './index'

const getApiRoot = req => req ? `${process.env.NODE_ENV === 'production' ? 'https:' : 'http:'}//${req.headers.host}` : ''

export const fetchMe = ({ req } = {}) => async (dispatch, getState, { cookies }) => {
  dispatch(fetchMeRequest())
  let payload
  try {
    payload = await request(`${getApiRoot(req)}/api/v1.1/me?circle-token=${cookies.get('__ct')}`)
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchMeReceive(payload))
  }
}

export const fetchProjects = ({ req } = {}) => async (dispatch, getState, { cookies }) => {
  dispatch(fetchProjectsRequest())
  let payload
  try {
    payload = await request(`${getApiRoot(req)}/api/v1.1/projects?circle-token=${cookies.get('__ct')}`)
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchProjectsReceive(payload))
  }
}

export const fetchRecentBuilds = ({ req, query = {} } = {}) => async (dispatch, getState, { cookies }) => {
  dispatch(fetchRecentBuildsRequest())
  let payload
  try {
    const queryString = querystring.stringify({
      offset: 0,
      limit: 20,
      ...query,
      'circle-token': cookies.get('__ct'),
    })
    payload = await request(`${getApiRoot(req)}/api/v1.1/recent-builds?${queryString}`)
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchRecentBuildsReceive(payload))
  }
}

export const fetchSingleBuild = ({ req, url } = {}) => async (dispatch, getState, { cookies }) => {
  dispatch(fetchSingleBuildRequest())
  const endpoint = req ? req.url : url
  let payload
  try {
    payload = await request(
      `${getApiRoot(req)}/api/v1.1/project${
        endpoint.replace(/^\/(gh|bb)/, (_, p) => p === 'gh' ? '/github' : (p === 'bb' ? '/bitbucket' : '/'))
      }?circle-token=${cookies.get('__ct')}`
    )
    console.log(payload)
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchSingleBuildReceive(payload))
  }
}
