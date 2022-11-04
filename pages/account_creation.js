import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'

import styles from '../styles/login.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export default function AccountCreation() {

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            username: event.target.username.value,
            email: event.target.emailAddress.value,
            nnumber: event.target.nnumber.value,
            password: event.target.password.value,
            passwordConfirmation: event.target.passwordConfirmation.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
        }

        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/accountCreationForm'
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
        else if (response.status == 401) {
            alert(result.message)
        }
    }

    return (
        <div>
            <Head>
                <title>Account Creation</title>
                <meta name="description" content="Account Creation page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Image src={unfLogo} alt="UNF"/>
            </header>
    
            <main>
                <h1>
                    Create an Account
                </h1>

                <form onSubmit={handleSubmit} method="post">
                    <input name='username' className={styles.input} type="text" placeholder="Username" required/>
                    <br></br>
                    <input name='email' className={styles.input} type="text" placeholder="Email Address" required/>
                    <br></br>
                    <input name='nnumber' className={styles.input} type="text" placeholder="N-Number" required/>
                    <br></br>
                    <input name='password' className={styles.input} type="password" placeholder="Password" required/>
                    <br></br>
                    <input name='passwordConfirmation' className={styles.input} type="password" placeholder="Confirm Password" required/>
                    <br></br>
                    <input name='firstName' className={styles.input} type="text" placeholder="First Name" required/>
                    <br></br>
                    <input name='lastName' className={styles.input} type="text" placeholder="Last Name" required/>
                    <input type="submit" value="Log in"/>
                </form>
            </main>
        </div>
    )
}
