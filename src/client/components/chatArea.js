import React from 'react'
import MessageFeed from './messageFeed'

export default class ChatArea extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputValue: ''
        }
    }
    
    componentDidMount() {

    }

    updateInputValue(e) {
        this.setState({inputValue: e.target.value})
    }

    sendIt(message) {
        if (message === '') {
            return
        }
        this.props.sendIt(message)
        this.setState({inputValue: ''})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendIt(this.state.inputValue)
        }
    }

    render() {
        const {messages, myID} = this.props

        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <input value={this.state.inputValue} onChange={(e) => {this.updateInputValue(e)}} placeholder="Message" type="text" className="form-control" onKeyPress={(e) => {this.handleKeyPress(e)}}></input>
                    <button className="btn btn-primary" onClick={() => {this.sendIt(this.state.inputValue)}}>Send</button>
                </div>
                <br></br>
                <MessageFeed messages={messages} myID={myID}/>
            </div>
        )
    }
}
