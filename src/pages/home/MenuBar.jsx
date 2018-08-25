/**
 * Created by 30113 on 2018/3/22.
 */
import React from 'react'
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { getMenuList, openMenu } from '../../redux/framework.redux'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

@connect(
    state => state.framework,
    { getMenuList, openMenu }
)
class MenuBar extends React.Component {
    componentDidMount() {
        this.props.getMenuList()
    }
    handleClick = (e) => {
        console.log(e)
        this.props.openMenu(e.key)
    }
    mapMenus(menus) {
        return menus.map(v => {
            if (v.children) {
                return (
                    <SubMenu key={v.id} title={v.name}>
                        {
                            this.mapMenus(v.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <MenuItem
                        key={v.code}
                    >
                        <span className='nav-text'>{v.name}</span>
                    </MenuItem>
                )
            }
        })
    }
    render() {
        return (
            <Menu theme='dark'
                mode={'inline'}
                selectedKeys={[this.props.activeMenuCode]}
                onClick={this.handleClick}
            >
                {
                    this.mapMenus(this.props.menus)
                }
            </Menu>
        )
    }
}

export default MenuBar