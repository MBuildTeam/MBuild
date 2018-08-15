import React, { PureComponent } from 'react'
import AddForm from './AddForm'
import RoleTable from './RoleTable'
import './Role.scss'

class Role extends PureComponent {

    render() {
        return (
            <div>
                <AddForm />
                <RoleTable />
            </div>
        )
    }
}
export default Role
