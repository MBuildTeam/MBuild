const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    id: '111',
    name: "组织机构",
    Url: 'organization',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
{
    id: '222',
    name: "权限",
    Url: 'operation',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
{
    id: '333',
    name: "角色",
    Url: 'role',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
{
    id: '444',
    name: "用户",
    Url: 'user',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
{
    id: '555',
    name: "用户组",
    Url: 'usergroup',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
{
    id: '666',
    name: "组织机构分类",
    Url: 'classification',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
{
    id: '777',
    name: "项目",
    Url: 'project',
    status:1,
    Creator: "System",
    createtime: Mock.Random.date(),
},
]

//查询用户菜单
Mock.mock(/\/api\/menu\/listbyuser/, 'get', function (options) {
    return arr
})

//查询
Mock.mock(/\/api\/menu\/list/, 'get', function (options) {
    const name = getParam(options.url, 'name')
    if (name) {
        return _.filter(arr, item => item.name.indexOf(name) > -1)
    } else {
        return arr
    }
})

//新增
Mock.mock('/api/menu/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.id = Mock.Random.id()
    info.createtime = Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/menu/update', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr, (item) => (item.id === info.id))
    let updated = _.assign(origin, info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/menu/delete', 'post', function (options) {
    let id = JSON.parse(options.body).id
    _.remove(arr, item => (
        item.id === id
    ))
    return { code: 1, msg: '删除成功' }
})