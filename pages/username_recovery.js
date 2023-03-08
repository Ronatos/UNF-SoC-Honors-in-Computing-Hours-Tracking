import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'

import styles from '../styles/UsernameRecovery.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export default function UsernameRecovery() {

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.email.value,
        }

        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/username_recovery_form'
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
                <title>Username Recovery</title>
                <meta name="description" content="Username Recovery page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Image src={unfLogo} alt="UNF"/>
            </header>
    
            <main>
                <h1 className={styles.description}>
                    Username Recovery
                </h1>

                <p className={styles.p}>
                    We&apos;ll send you an email containing your username(s)
                </p>

                <form className={styles.description} onSubmit={handleSubmit} method="post">
                    <input name='email' className={styles.input} type="text" placeholder="Email Address" required/>
                    <br></br>
                    <input type="submit" value="Recover Username"/>
                </form>
            </main>
        </div>
    )
}
