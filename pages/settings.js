import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import '../styles/setting.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Settings Page</title>
        <meta name="description" content="The settings page for UNF Leadership" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="fontawesome/css/all.css"></link>
      </Head>

      <main>
  
      <div>   
        <h1>ACCOUNT INFO</h1>
        <br></br>
        <h5>GENERAL INFORMATION</h5>
      </div>

      

      <div>
      <p style={{ color: 'red' }}>Yo check out</p>
      </div>

      

      </main>
    </div>
  )
}

