import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import RoleTable from './RoleTable'
import RoleModal from './RoleModal'

import './Role.scss'

class Role extends PureComponent {
    render() {
        return (
            <div>
                <SearchForm />
                <RoleTable />
                <RoleModal />
            </div>
        )
    }
}

export default Role