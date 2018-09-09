import axios from 'axios'
import { message } from 'antd'

//拦截请求
axios.interceptors.request.use(function (config) {
    message.loading('加载中', 0)
    return config
})

//拦截响应
axios.interceptors.response.use(
    res => {
        message.destroy()
        return res
    },
    err => {
        message.destroy()
        return err
    }
)