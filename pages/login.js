import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/login.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import RenderResult from 'next/dist/server/render-result'
import Router from 'next/router'

export default function Login() {

    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/loginForm'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the data submitted, that means the form works.
        const result = await response.json()

        if (response.status == 200) {
            alert(result.message)
            Router.push("/")
        }
        else if (response.status == 401) {
            alert(result.message)
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
