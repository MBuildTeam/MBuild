const Mock = require('mockjs')
const _ = require('lodash')
// Mock.mock('/api/orga/list',{
//     "data|3":[
//         {
//             "ID":"@id",
//             "Name":"@name",
//             "Status|1":[1,2],
//             "Creator":"System",
//             "CreateTime":Mock.Random.date(),
//             "IsManagerPlatform|1":true,
//             "KeyWord":"KeyWord",
//         }
//     ]
// })

let arr = []

//查询
Mock.mock('/api/orga/list','post',function(options){
    console.log(options)
    return arr
})

//新增
Mock.mock('/api/orga/add','post',function(options){
    let info = JSON.parse(options.body)
    info.ID = Mock.Random.id()
    info.CreateTime =Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return {code:1,msg:'新增成功',data:info}
})

//修改
Mock.mock('/api/orga/edit','post',function(options){
    let info = JSON.parse(options.body)

    return {code:1,msg:'修改成功',data:info}
})

//删除
Mock.mock('/api/orga/delete','post',function(options){
    let ID = JSON.parse(options.body).ID
    console.log(arr)
    _.remove(arr,item=>(
        item.ID === ID
    ))
    return {code:1,msg:'删除成功'}
})