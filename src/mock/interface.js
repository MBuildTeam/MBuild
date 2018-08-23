const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    id: '111',
    Name: "接口1",
    Creator: "System",
    CreateTime: Mock.Random.date(),
},{
    id: '222',
    Name: "接口2",
    Creator: "System",
    CreateTime: Mock.Random.date(),
}]

//查询
Mock.mock(/\/api\/interface\/list/, 'get', function (options) {
    const Name = getParam(options.url,'Name')
    if(Name){
        return _.filter(arr,item=>item.Name.indexOf(Name)>-1)
    }else{
        return arr
    }
})

//新增
Mock.mock('/api/interface/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.id = Mock.Random.id()
    info.CreateTime = Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/interface/edit', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr,(item)=>(item.id === info.id))
    let updated = _.assign(origin,info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/interface/delete', 'post', function (options) {
    let id = JSON.parse(options.body).id
    _.remove(arr, item => (
        item.id === id
    ))
    return { code: 1, msg: '删除成功' }
})