/**
 * Created by 30113 on 2018/2/21.
 */
import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authCheck } from '../../redux/auth.redux'

@withRouter
@connect(
    null,
    { authCheck }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        const loginname = sessionStorage.getItem('loginname')
        const password = sessionStorage.getItem('password')
        this.props.authCheck(loginname,password)

        // axios.get('/api/login/submit', { params: { loginname, password } })
        //     .then(res => {
        //         if (res.data.code === 0) {
        //             //有登录信息
        //             this.props.loadData(res.data.data)
        //         } else {
        //             this.props.history.push('./login')
        //         }
        //     })
        //     .catch(e => {
        //         this.props.history.push('./login')
        //     })
    }
    render() {
        return null
    }
}
export default AuthRoute