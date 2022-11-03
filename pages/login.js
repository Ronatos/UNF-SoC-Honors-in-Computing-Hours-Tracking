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

                <div className={styles.links}>
                    <Link href="/account_creation">Create an account</Link>
                </div>

                <div className={styles.links}>
                    <Link href="/username_recovery">Forgot username?</Link>
                    <span className={styles.linkSpacing}></span>
                    <Link href="/password_reset">Forgot Password?</Link>
                </div>
            </main>
        </div>
    )
}
