const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    id: 1,
    name: '组织1',
    ismanagerplatform: 1,
    status: 0,
    creatorid: 1,
    createtime: '2018-08-15',
}, {
    id: 2,
    name: '组织2',
    ismanagerplatform: 0,
    status: 1,
    creatorid: 1,
    createtime: '2018-08-15',
}]

//查询
Mock.mock(/\/api\/organization\/list/, 'get', function (options) {
    const Name = getParam(options.url, 'Name')
    if (Name) {
        return _.filter(arr, item => item.Name.indexOf(Name) > -1)
    } else {
        return arr
    }
})

//新增
Mock.mock('/api/organization/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.id = arr[arr.length - 1].id + 1
    info.createtime = Mock.Random.date()
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/organization/update', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr, (item) => (item.ID === info.ID))
    let updated = _.assign(origin, info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/orga/delete', 'post', function (options) {
    let id = JSON.parse(options.body).id
    _.remove(arr, item => (
        item.id === id
    ))
    return { code: 1, msg: '删除成功' }
})