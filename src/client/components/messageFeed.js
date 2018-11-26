import React from 'react';

export default class MessageFeed extends React.Component {

    render() {
        const {messages, myID} = this.props
        const messageList = (  
            <ul className="list-group">
                {messages.map((m, index) => {
                    console.log(index)
                    if (m.author === myID) {
                        return(<li key={index} className="list-group-item list-group-item-primary">{m.author}: {m.message}</li>)
                    } else {
                        return(<li key={index} className="list-group-item">{m.author}: {m.message}</li>)
                    }
                })}
            </ul>
        )
        return (
            messageList
        )
    }
}
