import styles from './styles.module.scss'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'

export const SendMessageForm = () => {
    const [message, setMessage] = useState('')

    const { user, signOut } = useContext(AuthContext)

    const handleSendMessage = async (event: FormEvent) => {
        event.preventDefault()
        if(!message.trim()) {
            return;
        }

        await api.post('messages', {message})

        setMessage('')
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={() => signOut} className={styles.signOutButton}>
                <VscSignOut  size='32'/>
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
                <label htmlFor="message">Mensagem</label>
                <textarea 
                    name="message" 
                    id="message" 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Qual a sua expectativa para o evento ?"/>

                <button type="submit">Enviar mensagem</button>
            </form>
        </div>
    )
}