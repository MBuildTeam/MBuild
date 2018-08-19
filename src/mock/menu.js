const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    ID: '520000201103289947',
    Name: "菜单1",
    Creator: "System",
    CreateTime: Mock.Random.date(),
},{
    ID: '810000197912255907',
    Name: "菜单2",
    Creator: "System",
    CreateTime: Mock.Random.date(),
}]

//查询
Mock.mock(/\/api\/menu\/list/, 'get', function (options) {
    const Name = getParam(options.url,'Name')
    if(Name){
        return _.filter(arr,item=>item.Name.indexOf(Name)>-1)
    }else{
        return arr
    }
})

//新增
Mock.mock('/api/menu/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.ID = Mock.Random.id()
    info.CreateTime = Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/menu/edit', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr,(item)=>(item.ID === info.ID))
    let updated = _.assign(origin,info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/menu/delete', 'post', function (options) {
    let ID = JSON.parse(options.body).ID
    _.remove(arr, item => (
        item.ID === ID
    ))
    return { code: 1, msg: '删除成功' }
})