import axios from 'axios'
import {message} from 'antd'

let hide
//拦截请求
axios.interceptors.request.use(function(config){
    hide = message.loading('加载中',0)
    return config
})

//拦截响应
axios.interceptors.response.use(function(config){
    hide()
    return config
})