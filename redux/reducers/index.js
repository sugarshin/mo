import { combineReducers } from 'redux'
import auth from './auth'
import me from './me'
import projects from './projects'
import builds from './builds'
import build from './build'

export default combineReducers({
  auth,
  me,
  projects,
  builds,
  build,
})
