import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import Router from 'next/router'

import styles from '../styles/StudentFormPage.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export default function StudentFormPage() {
    return (
        <div>
            <Head>
                <title>Student - Form</title>
                <meta name="description" content="The form page for UNF Leadership" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* header class for the UNF logo */}
            <header className={styles.header}>
                <Image src={unfLogo} alt="UNF"/>
            <div className={styles.link}>
                <Link href="/settings">Noti</Link>
                <Link href="/settings">Settings</Link>
            </div>
            </header>

            {/* main class the whole form page */}
            <main className={styles.page_body}>
            
                {/* title of page */}
                <div className={styles.container}>
                    <h1>Student Form</h1>
                    <button>Create New</button>
                </div>

                {/* form */}
                <div className={styles.form}>
                    <form>
                        <label>Enter your name:</label>
                        <input type="text" name="name" id="left_form" />
                        <br></br>
                        <label>Placeholder:</label>
                        <input type="text" name="name" />
                        <br></br>
                        <label>Placeholder:</label>
                        <input type="text" name="name" />
                        <br></br>

                    </form>
                </div>

            </main>     
        </div>
    )
}
