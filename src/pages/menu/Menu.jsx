import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import MenuTable from './MenuTable'
import './menu.scss'

class Menu extends PureComponent {
    render() {
        return (
            <div>
                <SearchForm />
                <MenuTable />
            </div>
        )
    }
}

export default Menu