const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    id: '111',
    name: "接口1",
    Creator: "System",
    CreateTime: Mock.Random.date(),
},{
    id: '222',
    name: "接口2",
    Creator: "System",
    CreateTime: Mock.Random.date(),
}]

//查询
Mock.mock(/\/api\/api\/select/, 'get', function (options) {
    const name = getParam(options.url,'name')
    if(name){
        return _.filter(arr,item=>item.name.indexOf(name)>-1)
    }else{
        return arr
    }
})

//新增
Mock.mock('/api/api/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.id = Mock.Random.id()
    info.CreateTime = Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/api/edit', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr,(item)=>(item.id === info.id))
    let updated = _.assign(origin,info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/api/delete', 'post', function (options) {
    let id = JSON.parse(options.body).id
    _.remove(arr, item => (
        item.id === id
    ))
    return { code: 1, msg: '删除成功' }
})