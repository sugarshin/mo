import querystring from 'querystring'
import request from '../../utils/request'
import resolveVcsType from '../../utils/resolveVcsType'
import {
  fetchMeRequest,
  fetchMeReceive,
  fetchRecentBuildsRequest,
  fetchRecentBuildsReceive,
  fetchSingleBuildRequest,
  fetchSingleBuildReceive,
  fetchStepsRequest,
  fetchStepsReceive,
  rebuildRequest,
  rebuildReceive,
  cancelBuildRequest,
  cancelBuildReceive,
  deleteBuildCacheRequest,
  deleteBuildCacheReceive,
  rebuildWithoutCacheRequest,
  rebuildWithoutCacheReceive
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
  let payload
  try {
    payload = await request(
      `${getApiRoot(req)}/api/v1.1/project${resolveVcsType(url)}?circle-token=${cookies.get('__ct')}`
    )
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchSingleBuildReceive(payload))
  }
}

export const pollFetchSingleBuild = ({ req, url } = {}) => async (dispatch, getState, { cookies }) => {
  let payload
  try {
    payload = await request(
      `${getApiRoot(req)}/api/v1.1/project${resolveVcsType(url)}?circle-token=${cookies.get('__ct')}`
    )
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchSingleBuildReceive(payload))
  }
}

export const fetchSteps = data => async (dispatch, getState, { cookies }) => {
  dispatch(fetchStepsRequest())
  let payload
  try {
    const res = await Promise.all(
      data.map(({ url }) => url ? request(url, {}, 'text') : Promise.resolve())
    )
    payload = data.map((d, i) => ({
      ...d,
      message: res[i] ? JSON.parse(res[i]).reduce((res, r) => `${res}${r.message}`, '') : ''
    }))
  } catch (e) {
    payload = e
  } finally {
    dispatch(fetchStepsReceive(payload))
  }
}

// curl -X POST https://circleci.com/api/v1.1/project/:vcs-type/:username/:project/:build_num/retry?circle-token=:token
// /:vcs-type/:username/:project/:build_num
export const rebuild = url => async (dispatch, getState, { cookies }) => {
  dispatch(rebuildRequest())
  let payload
  try {
    payload = await request(
      `/api/v1.1/project${resolveVcsType(url)}/retry?circle-token=${cookies.get('__ct')}`,
      { method: 'POST' }
    )
  } catch (e) {
    payload = e
  } finally {
    dispatch(rebuildReceive(payload))
  }
}

// curl -X POST https://circleci.com/api/v1.1/project/:vcs-type/:username/:project/:build_num/cancel?circle-token=:token
// /:vcs-type/:username/:project/:build_num
export const cancelBuild = url => async (dispatch, getState, { cookies }) => {
  dispatch(cancelBuildRequest())
  let payload
  try {
    payload = await request(
      `/api/v1.1/project${resolveVcsType(url)}/cancel?circle-token=${cookies.get('__ct')}`,
      { method: 'POST' }
    )
  } catch (e) {
    payload = e
  } finally {
    dispatch(cancelBuildReceive(payload))
  }
}

// curl -X DELETE https://circleci.com/api/v1.1/project/:vcs-type/:username/:project/build-cache?circle-token=:token
// /:vcs-type/:username/:project
export const deleteBuildCache = url => async (dispatch, getState, { cookies }) => {
  dispatch(deleteBuildCacheRequest())
  let payload
  try {
    payload = await request(
      `/api/v1.1/project${resolveVcsType(url)}/build-cache?circle-token=${cookies.get('__ct')}`,
      { method: 'DELETE' }
    )
  } catch (e) {
    payload = e
  } finally {
    dispatch(deleteBuildCacheReceive(payload))
  }
}

export const rebuildWithoutCache = url => async (dispatch, getState, { cookies }) => {
  dispatch(rebuildWithoutCacheRequest())
  const resolvedUrl = resolveVcsType(url)
  let payload
  try {
    await request(
      `/api/v1.1/project${resolvedUrl.replace(/\/[0-9]+$/, '')}/build-cache?circle-token=${cookies.get('__ct')}`,
      { method: 'DELETE' }
    )
    payload = await request(
      `/api/v1.1/project${resolvedUrl}/retry?circle-token=${cookies.get('__ct')}`,
      { method: 'POST' }
    )
  } catch (e) {
    payload = e
  } finally {
    dispatch(rebuildWithoutCacheReceive(payload))
  }
};
