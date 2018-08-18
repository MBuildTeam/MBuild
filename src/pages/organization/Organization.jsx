import React, { PureComponent } from 'react'
import SearchForm from './SearchForm'
import OrgaTable from './OrgaTable'
import OrgaModal from './OrgaModal'

import './Organization.scss'

class Organization extends PureComponent {
    render() {
        return (
            <div>
                <SearchForm />
                <OrgaTable />
                <OrgaModal />
            </div>
        )
    }
}

export default Organization