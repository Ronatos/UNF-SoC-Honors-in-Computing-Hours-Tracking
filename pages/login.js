import cookie from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'

import styles from '../styles/Login.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import Cookies from 'js-cookie'


export default function Login() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginToken = Cookies.get('unfHoursTrackingSessionToken');

        const response = await fetch('/api/login_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
                sessionToken: (loginToken == undefined) ? String(crypto.getRandomValues(new Uint32Array(1))) : loginToken
            }),
        });

        const result = await response.json();

        if (response.status == 200) {
            Router.push("/home");
        }
        else if (response.status == 400) {
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
