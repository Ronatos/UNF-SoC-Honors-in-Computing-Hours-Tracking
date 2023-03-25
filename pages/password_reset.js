import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import Link from 'next/link';

import styles from '../styles/AccountCreation.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export default function PasswordReset() {

    const handleSubmit1 = async (event) => {
        event.preventDefault()

        const response = await fetch('/api/password_reset_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value
            }),
        });

        const result = await response.json();

        alert(result.message);
        window.location.reload(false);
    }

    const handleSubmit2 = async (event) => {
        event.preventDefault()

        const response = await fetch('/api/password_reset_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event.target.code.value,
                new_password: event.target.new_password.value,
                confirm_new_password: event.target.confirm_new_password.value
            }),
        });

        const result = await response.json();

        alert(result.message);
        window.location.reload(false);
    }

    return (
        <div>
            <Head>
                <title>Password Reset</title>
                <meta name="description" content="Password Reset page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Link href="/"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            </header>

            <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
            </div>
    
            <main>
                <h1 className={styles.description}>
                    Password Reset
                </h1>

                <p className={styles.descriptionSmall}>
                    To reset your password, please generate a reset code.
                    <br></br>
                    You will receive an email with a code from unfsochonorsincomputing@gmail.com with your code.
                </p>

                <form className={styles.description} onSubmit={handleSubmit1} method="post">
                    <input name='username' className={styles.input} type="text" placeholder="Username" required/>
                    <br></br>
                    <input name='email' className={styles.input} type="text" placeholder="Email Address" required/>
                    <br></br>
                    <input type="submit" value="Generate Reset Code"/>
                </form>

                <form className={styles.description} onSubmit={handleSubmit2} method="post">
                    <input name='code' className={styles.input} type="text" placeholder="Reset Code"/>
                    <br></br>
                    <input name='new_password' className={styles.input} type="password" placeholder="New Password"/>
                    <br></br>
                    <input name='confirm_new_password' className={styles.input} type="password" placeholder="Confirm New Password"/>
                    <br></br>
                    <input type="submit" value="Reset Password"/>
                </form>
            </main>
        </div>
    )
}
