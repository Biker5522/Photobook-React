import '../styles/globals.css'
import '../styles/login.css'
import '../styles/navbar.css'
import '../styles/feed.css'
import '../styles/comments.css'
import '../styles/album.css'
import '../styles/photo.css'
import '../styles/albumNavComponent.css'
import Navbar from '../components/navbar'
import type { AppProps } from 'next/app'
import { useCookies } from 'react-cookie'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
