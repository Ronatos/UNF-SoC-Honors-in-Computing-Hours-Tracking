import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Router from 'next/router'
import { withSessionSsr } from './lib/config/withSession';

import styles from '../styles/Login.module.css'
import unfLogo from '../public/UNF_Logo.gif'

const Home = ({ user }) => (
    <div>
        <Head>
            <title>Home</title>
            <meta name="description" content="Home page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
            <Image src={unfLogo} alt="UNF"/>
        </header>

        <main className={styles.main}>

            <h1 className={styles.description}>
                UNF School of Computing <br></br> Honors in Computing Hours Tracking
            </h1>

            <h1>Hello {user.username}</h1>

        </main>
    </div>
);

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

export default Home;