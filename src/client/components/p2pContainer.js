import React from 'react'
import P2pStatus from './p2pStatus'

export default class P2pContainer extends React.Component {

    render() {

        const {status} = this.props

        return (
            <div>
                <P2pStatus status={status} />
            </div>
        );
    }
}
