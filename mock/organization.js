let Mock = require('mockjs')

Mock.mock('/api/orga/list',{
    "data|3":[
        {
            "ID":"@id",
            "Name":"@name",
            "Status|1":[1,2],
            "Creator":"System",
            "CreateTime":"@date",
            "IsManagerPlatform|1":true,
            "KeyWord":"KeyWord",
        }
    ]
})