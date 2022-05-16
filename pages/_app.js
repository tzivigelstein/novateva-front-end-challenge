import '../styles/globals.css'
import AuthProvider from '../context/auth/AuthContext'
import AppProvider from '../context/app/AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
