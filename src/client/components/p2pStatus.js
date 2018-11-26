import React from 'react';

export default class P2pStatus extends React.Component {

    render() {
        const {status} = this.props

        if (status) {
            return (
                <h5 style={{color: '#4fef6f'}}>Yup!</h5>
            )
        } else {
            return (
                <h5 style={{color: '#ed4e4e'}}>Nope</h5>
            )
        }
    }
}
