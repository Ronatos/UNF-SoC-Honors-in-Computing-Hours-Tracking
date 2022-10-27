import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

let username = "Username"
let password = "Password"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.description}>
          UNF School of Computing <br></br> Honors in Computing Hours Tracking
        </h1>

        <form className={styles.description}>
          <input type="text" value={username}/>
          <br></br>
          <input type="text" value={password}/>
          <br></br>
          <input type="submit" value="Log in"/>
        </form>

        <Link href="/account">Create an account</Link>
        <Link href="/loginhelp">Can&apos;t log in?</Link>
      </main>
    </div>
  )
}
