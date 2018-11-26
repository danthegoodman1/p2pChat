import React, { Component } from 'react'
import './css/bootstrap4-growth.min.css'
import ReactImage from './react.png'
import { setInterval } from 'timers';
import P2pStatus from './components/p2pStatus'

const P2P = require('socket.io-p2p')
const io = require('socket.io-client')
const socket = io(':8080/')
const opts = {autoUpgrade: false, numClients: 10}
const p2p = new P2P(socket, opts)

// setInterval(() => {
//   p2p.emit('healthCheck', '')
// }, 5000);

setInterval(() => {
    console.log(`I am ${socket.id}`)
    p2p.emit('sendMessage', `I am ${socket.id}`)
}, 2000);

p2p.on('sendMessage', (payload) => {
    console.log(`Got message: ${payload} from peer`)
})

export default class App extends Component {
    state = {
        username: null,
        p2pStatus: false
    }

    componentDidMount() {
        setTimeout(() => {
        p2p.upgrade()
        console.log("Let's get private!")
        this.setState({p2pStatus: true})
        }, 5000);
    }

    render() {
        const { username } = this.state;
        return (
        <div className="container">
            <div>
            <P2pStatus status={this.state.p2pStatus} />
            </div>
        </div>
        );
    }
}
