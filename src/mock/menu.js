let Mock = require('mockjs')

Mock.mock('/menu/list',{
    "menu":[{
        icon: 'laptop',
        text: '工作台',
        code: 'bench'
    },
    {
        icon: 'bars',
        text: '菜单',
        code: 'menu'
    },
    {
        icon: 'user',
        text: '用户管理',
        children: [{
            text: '角色',
            code: 'role'
        }]
    }]
})

Mock.mock('/menu/add','post',{

})