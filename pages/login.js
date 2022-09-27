import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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

        <a href='/account' target={"_blank"}>Create an account</a>
        <a href='/loginhelp' target={"_blank"}>Can't log in?</a>
      </main>
    </div>
  )
}
