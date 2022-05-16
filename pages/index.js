import { useEffect } from 'react'
import styles from '../styles/index.module.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import useApp from '../hooks/useApp'

export default function Home() {
  const { isAuth, loading } = useAuth()
  const { getRoomMessages } = useApp()

  const router = useRouter()

  useEffect(() => {
    if (!isAuth && !loading) router.replace('/login')
  }, [loading])

  if (!isAuth) return <p>Not authenticated...</p>

  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>

      <main className={styles.main}>
        <Navbar />
        <div className={styles.app}>
          <SideBar />
          <Chat />
        </div>
      </main>
    </>
  )
}
