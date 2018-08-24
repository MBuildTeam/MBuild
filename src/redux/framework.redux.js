USE_MOCK && require('../mock/menu')

import axios from 'axios'
import _ from 'lodash'

const MENU_LIST = 'MENU_LIST'
const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'
const ACTIVE_MENU = 'ACTIVE_MENU'

const initState = {
    menus: [],
    openedMenus: [],
    activeMenuCode: 'bench'
}

function getMenuByCode(menus, code) {
    var result = {};
    for (var key in menus) {
        var menu = menus[key]
        if (menu.children) {
            result = getMenuByCode(menu.children, code)
            if (result.code === code) {
                break
            }
        } else {
            if (menu.code === code) {
                result = { ...menu }
                break
            }
        }
    }
    return result
}

export function framework(state = initState, action) {
    switch (action.type) {
        case MENU_LIST:
            {
                return {
                    ...state,
                    menus: action.payload
                }
            }
        case OPEN_MENU:
            {
                let menuCode = action.payload
                if (_.findIndex(state.openedMenus, v => v.code == menuCode) === -1) {
                    let menu = getMenuByCode(state.menus, menuCode)
                    return {
                        ...state,
                        openedMenus: state.openedMenus.concat(menu),
                        activeMenuCode: menuCode
                    }
                } else {
                    return {
                        ...state,
                        activeMenuCode: menuCode
                    }
                }
            }
        case CLOSE_MENU:
            {
                let menuCode = action.payload
                let openedMenus = _.filter(state.openedMenus, v => v.code !== menuCode)
                let activeMenuCode = state.activeMenuCode === menuCode ? (openedMenus.length > 0 ? openedMenus[0].code : null) : state.activeMenuCode
                return {
                    ...state,
                    openedMenus: openedMenus,
                    activeMenuCode: activeMenuCode
                }
            }
        case ACTIVE_MENU: {
            let menuCode = action.payload
            return {
                ...state,
                activeMenuCode: menuCode
            }
        }
        default:
            return state
    }
}

function menuList(data) {
    return {
        type: MENU_LIST,
        payload: data
    }
}


export function getMenuList() {
    const menus = [
        {
            icon: 'bars',
            text: '菜单',
            code: 'menu'
        },
        {
            icon: 'bars',
            text: '组织机构',
            code: 'organization'
        },
        {
            icon: 'bars',
            text: '组织机构类别',
            code: 'classification'
        },
        {
            icon: 'bars',
            text: '用户',
            code: 'userinfo'
        },
        {
            icon: 'bars',
            text: '用户组',
            code: 'usergroup'
        },
        {
            icon: 'bars',
            text: '项目',
            code: 'project'
        },
        {
            icon: 'bars',
            text: '角色',
            code: 'roleinfo'
        },
        {
            icon: 'bars',
            text: '权限',
            code: 'operation'
        },
    ]
    return dispatch => {
        dispatch(menuList(menus))
    }
}

export function openMenu(menuCode) {
    return {
        type: OPEN_MENU,
        payload: menuCode
    }
}

export function closeMenu(menuCode) {
    return {
        type: CLOSE_MENU,
        payload: menuCode
    }
}

export function activeMenu(menuCode) {
    return {
        type: ACTIVE_MENU,
        payload: menuCode
    }
}