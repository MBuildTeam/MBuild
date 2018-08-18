import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { menu } from './redux/menu.redux'
import { bench } from './redux/bench.redux'
import { role } from './redux/role.redux'
import { rights } from './redux/rights.redux'
import { organization } from './redux/organization.redux'

export default combineReducers({ user, menu, bench, role, rights, organization })