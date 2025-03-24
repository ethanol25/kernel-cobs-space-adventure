import React, { useEffect, useRef } from "react"
import ARROW from '../assets/ARROW.png'

const CrewChat = ({chatLog, setChatLog}) => {
    
    const chatEndRef = useRef(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatLog])

    const chatData = chatLog.map((message, index) => (
        <div>
            <span style={{"color": "var(--celeste-cyan)"}} key={index}>{message.name}: </span>
            <span>{message.text}</span>
        </div>
    ))

    function handleChat(event) {
        event.preventDefault()
        const chatText = event.target.chatText.value.trim()
        if (chatText) {
            setChatLog((oldChats) => [...oldChats, { name: "Kernal Cob", text: chatText }])
        }
        event.target.reset()
    }

    return (
        <div className="messageContainer">
            <div className="chatText">
                {chatData}
                <div ref={chatEndRef} />
            </div>
            <div className="crewChatInput">
                <form onSubmit={handleChat}>
                    <input type="text" name="chatText" />
                    <button>
                        <img src={ARROW} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CrewChat;
