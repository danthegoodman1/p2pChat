import React from 'react';

export default class P2pStatus extends React.Component {

    render() {

        const {status} = this.props

        return (
            <div>
            { status && <p>Peer to Peer!</p>}
            </div>
        );
    }
}
