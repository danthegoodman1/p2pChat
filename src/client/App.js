import React, { Component } from 'react'
import './app.css'
import ReactImage from './react.png'
import { setInterval } from 'timers';

const P2P = require('socket.io-p2p')
const io = require('socket.io-client')
const socket = io(':8080/')
const opts = {autoUpgrade: false, numClients: 10}
const p2p = new P2P(socket, opts)

// setInterval(() => {
//   p2p.emit('healthCheck', '')
// }, 5000);

setTimeout(() => {
  p2p.upgrade()
  console.log("Let's get private!")
}, 5000);

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
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
