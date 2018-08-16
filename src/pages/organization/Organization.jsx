import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import OrgaTable from './OrgaTable'
import OrgaForm from './OrgaForm'

import './organization.scss'

class Menu extends PureComponent {
    render() {
        return (
            <div>
                <SearchForm />
                <OrgaTable />
                <OrgaForm />
            </div>
        )
    }
}

export default Menu