const express = require('express')
const os = require('os')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const p2p = require('socket.io-p2p-server').Server
io.use(p2p)

io.on('connection', (socket) => {
    console.log(`New Connection from socket: ${socket.id}`)

    socket.on('healthCheck', (payload) => {
        console.log(`healthCheck from socket with id: ${socket.id}`)
    })

    socket.on('disconnect', (payload) => {
        console.log(`Socket with id: ${socket.id} disconnected`)
    })

    socket.emit('sendToClient', 'Hey glad you could make it')

    socket.on('sendMessage', (payload) => {
        console.log(`Message: ${payload} from ${socket.id}`)
    })
})

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))

app.get('/', (req, res) => {
    res.send('I\'m here')
})

http.listen(8080, () => {
    console.log('Listening on port 8080!')
});
