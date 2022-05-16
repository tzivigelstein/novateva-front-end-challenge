import { Chat } from '../Icons'
import styles from './index.module.css'
import LogoutButton from './LogoutButton'
import Identifier from './Identifier'

export default function SideBar() {
  return (
    <aside className={styles.sideBar}>
      <Identifier name="Chat" icon={<Chat />} />
      <LogoutButton />
    </aside>
  )
}
