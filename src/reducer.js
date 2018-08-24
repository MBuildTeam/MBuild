import { combineReducers } from 'redux'
import { auth } from './redux/auth.redux'
import { framework } from './redux/framework.redux'
import { userinfo } from './redux/userinfo.redux'
import { usergroup } from './redux/usergroup.redux'
import { menu } from './redux/menu.redux'
import { bench } from './redux/bench.redux'
import { role } from './redux/role.redux'
import { rights } from './redux/rights.redux'
import { organization } from './redux/organization.redux'
import { classification } from './redux/classification.redux'
import { api } from './redux/api.redux'
import { project } from './redux/project.redux'
import { projManager } from './redux/projManager.redux'


export default combineReducers({
    auth,
    framework,
    userinfo,
    usergroup,
    menu,
    bench,
    role,
    rights,
    organization,
    classification,
    api,
    project,
    projManager,
})