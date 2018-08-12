import React from 'react'
import { Icon, Modal, Popover } from 'antd'
import { connect } from 'react-redux'
import { openMenu, closeMenu } from '../../redux/menu.redux'
import { resetBenchState } from '../../redux/bench.redux'

@connect(
    state => state.menu,
    { openMenu, closeMenu, resetBenchState }
)
class OpenedMenuBar extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleLeft = this.handleLeft.bind(this)
        this.handleRight = this.handleRight.bind(this)
        this.state = {
            leftEnable: false,
            rightEnable: false,
            left: 0,
            menuBarWrap_width:0,
            menus_width:0,
        }
    }
    componentDidUpdate() {
        //在这里计算菜单总宽度、菜单外容器宽度、菜单内容器left值
        //当left<0时，left按钮可以使用
        //菜单总宽度+left值，仍大于菜单外宽度时，right按钮可用
        let leftEnable, rightEnable
        let menuBarWrap = document.getElementsByClassName('menu-bar-wrap')[0]
        let menuBarWrap_width = menuBarWrap.offsetWidth
        let menuBarContainer = menuBarWrap.firstChild
        let left = menuBarContainer.offsetLeft
        let menus = menuBarContainer.childNodes
        let menus_width = Array.prototype.reduce.call(menus, (total, item) => {
            return total + item.offsetWidth
        }, 0)
        leftEnable = left < 0
        rightEnable = menus_width + left > menuBarWrap_width
        this.setState({
            leftEnable, rightEnable,menuBarWrap_width,menus_width
        })
    }
    /**
     * 根据打开的菜单数组生成菜单列表
     * 可以同时用于横向菜单和列表显示
     * @param {Array} openedMenus 
     */
    getOpenedMenuList(openedMenus) {
        return openedMenus.map(v => (
            <div
                key={v.code}
                className={v.code === this.props.activeMenuCode ? 'menu active' : 'menu'}
            >
                <div
                    onClick={() => { this.clickMenu(v.code) }}
                >
                    <Icon className="menu-icon" type={v.icon} />
                    {v.text}
                </div>
                <Icon className="close" type="close" onClick={() => { this.closeMenu(v) }} />
            </div>
        ))
    }
    clickMenu(menuCode) {
        this.props.openMenu(menuCode)
    }
    /**
     * 关闭某个菜单
     * @param {Object} menu 
     */
    closeMenu(menu) {
        Modal.confirm({
            title: '确认',
            content: `将要关闭【${menu.text}】窗口，是否继续？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.props.closeMenu(menu.code)
                switch (menu.code) {
                    case 'bench':
                        this.props.resetBenchState()
                        break
                    default:
                        break;
                }
            }
        })
    }
    handleLeft() {
        let { leftEnable, left } = this.state
        if (leftEnable) {
            if (left < -100) {
                left += 100
                leftEnable = true
            } else {
                left = 0
                leftEnable = false
            }
            this.setState({ left,leftEnable })
        }
    }
    handleRight() {
        let { rightEnable, left ,menuBarWrap_width,menus_width} = this.state
        if (rightEnable) {
            let right = menus_width+left-menuBarWrap_width
            if(right>100){
                left -=100
                rightEnable = true
            }else{
                left -=right
                rightEnable = false
            }
            this.setState({ left,rightEnable })
        }
    }
    render() {
        const { leftEnable, rightEnable, left } = this.state
        return (
            <div className="menu-bar">
                <div className="menu-bar-wrap">
                    <div className="menu-bar-container" style={{ left: left + 'px' }}>
                        {
                            this.getOpenedMenuList(this.props.openedMenus)
                        }
                    </div>
                </div>
                <div className="menu-bar-ctrl">
                    <Icon type="caret-left"
                        className={leftEnable ? 'ctrl-enable' : 'ctrl-disable'}
                        onClick={this.handleLeft} />
                    <Popover
                        trigger="click"
                        title="打开的菜单"
                        content={this.getOpenedMenuList(this.props.openedMenus)}
                    >
                        <Icon type="bars" className="ctrl-enable" />
                    </Popover>
                    <Icon type="caret-right"
                        className={rightEnable ? 'ctrl-enable' : 'ctrl-disable'}
                        onClick={this.handleRight} />
                </div>
            </div>
        )
    }
}

export default OpenedMenuBar