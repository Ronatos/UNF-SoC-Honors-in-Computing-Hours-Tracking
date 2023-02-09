import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import newFormIcon from '../public/new_form.png';
import viewFormsIcon from '../public/view_forms.png';
import { withSessionSsr } from './lib/config/withSession';

import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user) {
            return {
                notFound: true,
            }
        }

        return {
            props: { user }
        }
    }
);

const handleLogout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const Home = ({ user }) => {
    if (user.role == 'student') {
        return (
            <div>
                <Head>
                    <title>Student Home</title>
                    <meta name="description" content="Student home page" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <header className={styles.header}>
                    <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                </header>

                <main className={styles.main}>
                    <span className={styles.navSelector}>
                        <div className={styles.navIcon}>
                            <Link href="/student_form"><Image src={newFormIcon} alt="New Form"/></Link>
                        </div>
                        <h2 className={styles.description} style={{margin: "5%"}}>Submit Hours</h2>
                    </span>

                    <div className={styles.navSelector}>
                        <div className={styles.navIcon} style={{width: "50%"}}>
                            <Link href="/student_submitted_forms"><Image src={viewFormsIcon} alt="View Submitted Hours"/></Link>
                        </div>
                        <h2 className={styles.description} style={{margin: "5%"}}>View Submitted Hours</h2>
                    </div>
                </main>
            </div>
        )
    }
    else if (user.role == 'faculty') {
        return;
    }
    else if (user.role == 'administrator') {
        return;
    }
};

export default Home;