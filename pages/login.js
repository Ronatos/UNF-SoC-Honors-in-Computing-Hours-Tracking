import Head from 'next/head'
import Image from 'next/image'
import unfLogo from '../public/UNF_Logo.gif'
// import stylesOriginal from '../styles/Home.module.css'
import styles from '../styles/login.module.css'
import Link from 'next/link'

let username = "Username"
let password = "Password"

export default function Login() {
    return (
        <div>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Image src={unfLogo} alt="UNF"/>
            </header>

            <main className={styles.main}>

                <h1 className={styles.description}>
                    UNF School of Computing <br></br> Honors in Computing Hours Tracking
                </h1>

                <form className={styles.description}>
                    <input type="text" defaultValue={username}/>
                    <br></br>
                    <input type="text" defaultValue={password}/>
                    <br></br>
                    <input type="submit" value="Log in"/>
                </form>

                <Link href="/account">Create an account</Link>
                <Link href="/loginhelp">Can&apos;t log in?</Link>
            </main>
        </div>
    )
}
