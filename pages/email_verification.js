import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import Router from 'next/router';

import styles from '../styles/AccountCreation.module.css';
import unfLogo from '../public/UNF_Logo.gif';

export default function EmailVerification() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/email_verification_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: event.target.email.value,
                code: event.target.code.value
            }),
        });

        const result = await response.json();

        if (response.status == 200) {
            alert(result.message);
            Router.push("/login");
        }
        else if (response.status == 400) {
            alert(result.message);
        }
    }

    return (
        <div>
            <Head>
                <title>Email Verification</title>
                <meta name="description" content="Email Verification page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Link href="/login"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            </header>

            <div className={styles.breadcrumb}>
                <Link href="/login">Home</Link>
                <span> &#62; </span>
                <Link href="/account_creation">Account Creation</Link>
            </div>

            <main>
                <h1 className={styles.description}>
                    Verify your Email Address
                </h1>

                <form className={styles.description} onSubmit={handleSubmit} method="post">
                    <input name='email' className={styles.input} type="email" placeholder="Email Address" required/>
                    <br></br>
                    <input name='code' className={styles.input} type="text" placeholder="Verification code" required/>
                    <br></br>
                    <input type="submit" value="Verify"/>
                </form>

                <div className={styles.link}>
                    <Link href="/email_verification">Resend verification email</Link>
                </div>
            </main>
        </div>
    );
}
