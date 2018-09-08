import React, { Component } from 'react'
import HeaderBar from './HeaderBar'
import NewsList from './NewsList'

class Page extends Component {
    render() {
        return (
            <div>
                <HeaderBar />
                <NewsList />
            </div>
        )
    }
}
export default Page