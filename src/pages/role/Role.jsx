import React, { PureComponent } from 'react'
import AddForm from './AddForm'
import RoleTable from './RoleTable'
import './Role.scss'

class Role extends PureComponent {

    render() {
        return (
            <div>
                <div>
                    <AddForm />
                </div>
                <div>
                    <RoleTable />
                </div>
            </div>
        )
    }
}
export default Role
