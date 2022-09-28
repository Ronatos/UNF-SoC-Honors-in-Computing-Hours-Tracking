import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import '../styles/settings.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Settings Page</title>
        <meta name="description" content="The settings page for UNF Leadership" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Settings Page!
        </h1>

      </main>

    </div>


  )
}
