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

        alert(result.message);
        window.location.reload(false);
    }

    return (
        <div>
            <Head>
                <title>Email Verification</title>
                <meta name="description" content="Email Verification page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Link href="/"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            </header>

            <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span> &#62; </span>
                <Link href="/account_creation">Account Creation</Link>
            </div>

            <main>
                <h1 className={styles.description}>
                    Verify your Email Address
                </h1>

                <p className={styles.descriptionSmall}>
                    You will receive an email with a code from unfsochonorsincomputing@gmail.com.
                    <br></br>
                    If you need us to resend the code, please enter your email address and leave the code blank.
                </p>

                <form className={styles.description} onSubmit={handleSubmit} method="post">
                    <input name='email' className={styles.input} type="email" placeholder="Email Address" required/>
                    <br></br>
                    <input name='code' className={styles.input} type="text" placeholder="Verification code"/>
                    <br></br>
                    <input type="submit" value="Verify"/>
                </form>
            </main>
        </div>
    );
}
