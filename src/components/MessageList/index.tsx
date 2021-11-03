import styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:4000')
socket.on('new_message', message => {
    messagesQueue.push(message)
})

export const MessageList = () => {

    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        setInterval(() => {
            if(messagesQueue.length > 0) {
                setMessages( prevState => [
                    messagesQueue[0],
                    messages[0],
                    messages[1]
                ].filter(Boolean))

                messagesQueue.shift()
            }
        }, 3000)
    },[])

    useEffect(() => {
        api.get<Message[]>('messages/last3').then(response => {
            setMessages(response.data)
        })
        
    }, [])

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 20221" />

            <ul className={styles.messageList}>
                {messages.map(message => {
                    return (
                        <li className={styles.message} key={message.id}>
                            <p className={styles.messageContent}>{message.text}</p>
                                <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}