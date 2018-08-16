import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import OrgaTable from './OrgaTable'
import './organization.scss'

class Menu extends PureComponent {
    render() {
        return (
            <div>
                <SearchForm />
                <OrgaTable />
            </div>
        )
    }
}

export default Menu