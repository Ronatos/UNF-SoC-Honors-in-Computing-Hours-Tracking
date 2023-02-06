import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'

import styles from '../styles/Login.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export default function Login() {

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const response = await fetch('/api/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value
            })
        });

        const result = await response.json();

        if (response.ok) {
            return Router.push("/home");
        }
        else {
            alert(result.message);
        }
    }

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

                <form className={styles.description} onSubmit={handleSubmit} method="post">
                    <input name='username' className={styles.input} type="text" placeholder="Username" required/>
                    <br></br>
                    <input name='password' className={styles.input} type="password" placeholder="Password" required/>
                    <br></br>
                    <input type="submit" value="Log in"/>
                </form>

                <div className={styles.links}>
                    <Link href="/username_recovery">Forgot username?</Link>
                    <span className={styles.linkSpacing}></span>
                    <Link href="/password_reset">Forgot Password?</Link>
                    <span className={styles.linkSpacing}></span>
                    <Link href="/account_creation">Create an account</Link>
                </div>
            </main>
        </div>
    )
}
