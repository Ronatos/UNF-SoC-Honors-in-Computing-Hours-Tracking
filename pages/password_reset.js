import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'

import styles from '../styles/AccountCreation.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export default function PasswordReset() {

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            passwordConfirmation: event.target.passwordConfirmation.value,
        }

        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/password_reset_form'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()

        // Update here
        if (response.status == 200) {
            alert(result.message)
            Router.push("/")
        }
        else if (response.status == 400) {
            alert(result.message)
        }
    }

    return (
        <div>
            <Head>
                <title>Password Reset</title>
                <meta name="description" content="Password Reset page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Image src={unfLogo} alt="UNF"/>
            </header>
    
            <main>
                <h1 className={styles.description}>
                    Password Reset
                </h1>

                <form className={styles.description} onSubmit={handleSubmit} method="post">
                    <input name='username' className={styles.input} type="text" placeholder="Username" required/>
                    <br></br>
                    <input name='email' className={styles.input} type="text" placeholder="Email Address" required/>
                    <br></br>
                    <input name='password' className={styles.input} type="password" placeholder="Password" required/>
                    <br></br>
                    <input name='passwordConfirmation' className={styles.input} type="password" placeholder="Confirm Password" required/>
                    <br></br>
                    <input type="submit" value="Reset Password"/>
                </form>
            </main>
        </div>
    )
}
