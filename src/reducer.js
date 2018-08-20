import { combineReducers } from 'redux'
import { auth } from './redux/auth.redux'
import { framework } from './redux/framework.redux'
import { user } from './redux/user.redux'
import { userGroup } from './redux/userGroup.redux'
import { menu } from './redux/menu.redux'
import { bench } from './redux/bench.redux'
import { role } from './redux/role.redux'
import { rights } from './redux/rights.redux'
import { organization } from './redux/organization.redux'

export default combineReducers({
    auth,
    framework,
    user,
    userGroup,
    menu,
    bench,
    role,
    rights,
    organization
})