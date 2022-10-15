import '../styles/globals.css'
import '../styles/login.css'
import '../styles/navbar.css'
import '../styles/feed.css'
import Navbar from '../components/navbar'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
