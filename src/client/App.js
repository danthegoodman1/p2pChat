import React, { Component } from 'react'
import './css/bootstrap4-growth.min.css'
import ReactImage from './react.png'
import { setInterval } from 'timers';
import P2pContainer from './components/p2pContainer'
import ChatArea from './components/chatArea'

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
        p2pStatus: false,
        messages: [{author: 'nope', message: 'example message'}],
        myID: ''
    }
    
    componentDidMount() {
        this.setState({myID: `user-${Math.floor(Math.random() * 1000)}`})
        setTimeout(() => {
        p2p.upgrade()
        console.log("Let's get private!")
        this.setState({p2pStatus: true})
        }, 5000);
        p2p.on('p2pMessage', (payload) => {
            let tempMessages = [...this.state.messages]
            tempMessages.push(payload)
            this.setState({messages: tempMessages})
            console.log('got event')
        })
    }

    sendIt(message) {
        console.log('Sending Message')
        p2p.emit('p2pMessage', {
            author: this.state.myID,
            message,
        })
        let tempMessages = [...this.state.messages]
        tempMessages.push({
            author: this.state.myID,
            message,
        })
        this.setState({messages: tempMessages})
    }

    render() {

        const { username } = this.state;
        return (
        <div className="container">
            <div className="row">
                <div className="card bg-primary text-white text-center" style={{marginTop: '2%'}}>
                    <div className="card-body">
                        <blockquote className="card-blockquote" style={{marginBottom: '-5%'}}>
                        <h6>Peer-to-Peer status:</h6>
                        <footer>
                            <P2pContainer status={this.state.p2pStatus} />
                        </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
            <div className="row">
                <ChatArea messages={this.state.messages} myID={this.state.myID} sendIt={this.sendIt.bind(this)}/>
            </div>
        </div>
        );
    }
}
