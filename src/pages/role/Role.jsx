import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import DataTable from './DataTable'
import FormModal from './FormModal'

import './Role.scss'

class Role extends PureComponent {
    render() {
        return (
            <div>
                <SearchForm />
                <DataTable />
                <FormModal />
            </div>
        )
    }
}

export default Role