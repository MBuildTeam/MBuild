import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import DataTable from './DataTable'
import FormModal from './FormModal'

import './OrgaType.scss'

class OrgaType extends PureComponent {
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

export default OrgaType