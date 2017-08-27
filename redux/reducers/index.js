import { combineReducers } from 'redux'
import auth from './auth'
import me from './me'
import builds from './builds'
import build from './build'
import sidemenu from './sidemenu'
import steps from './steps'

export default combineReducers({
  auth,
  me,
  builds,
  build,
  steps,
  sidemenu,
})
