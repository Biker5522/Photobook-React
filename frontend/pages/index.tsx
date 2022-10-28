import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Feed from './feed'

const Home: NextPage = () => {
  return <Feed />
}

export default Home
