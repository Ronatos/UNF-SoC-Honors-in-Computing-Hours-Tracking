import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import Router from 'next/router';

import styles from '../styles/AccountCreation.module.css';
import unfLogo from '../public/UNF_Logo.gif';

export default function AccountCreation() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/account_creation_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                role: event.target.role.value,
                first_name: event.target.first_name.value,
                last_name: event.target.first_name.value,
            }),
        });

        const result = await response.json();

        if (response.status == 200) {
            Router.push("/email_verification");
        }
        else if (response.status == 400) {
            alert(result.message);
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
                <Link href="/login"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            </header>

            <div className={styles.breadcrumb}>
                <Link href="/login">Home</Link>
            </div>

            <main>
                <h1 className={styles.description}>
                    Create an Account
                </h1>

                <form className={styles.description} onSubmit={handleSubmit} method="post">
                    <input name='username' className={styles.input} type="text" placeholder="Username" required/>
                    <br></br>
                    <input name='email' className={styles.input} type="email" placeholder="Email" data-tip="UNF email required" required/><ReactTooltip place="bottom"/>
                    <br></br>
                    <input name='password' className={styles.input} type="password" placeholder="Password" required/>
                    <br></br>
                    <input name='first_name' className={styles.input} type="text" placeholder="First Name" required/>
                    <br></br>
                    <input name='last_name' className={styles.input} type="text" placeholder="Last Name" required/>
                    <br></br>
                    <div className={styles.radio}>
                        <input name='role' type="radio" id="student" value="student" required/>
                        <label htmlFor="student" className={styles.radioLabel}>Student</label>
                        <input name='role' type="radio" id="faculty" value="faculty" required/>
                        <label htmlFor="faculty" className={styles.radioLabel} data-tip="Requires administrator approval">Faculty</label><ReactTooltip place="bottom"/>
                        <input name='role' type="radio" id="admin" value="admin" required/>
                        <label htmlFor="student" className={styles.radioLabel} data-tip="Requires administrator approval">Admin</label><ReactTooltip place="bottom"/>
                    </div>
                    <br></br>
                    <input type="submit" value="Create Account"/>
                </form>

                <div className={styles.link}>
                    <Link href="/email_verification">You must verify your email address before logging in</Link>
                </div>
            </main>
        </div>
    );
}
