import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/account.module.css'
import unfLogo from '../public/UNF_Logo.gif';
import { server, withSessionSsr } from './lib/config/withSession';

export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user || user.role != 'student') {
            return {
                notFound: true,
            }
        }

        return {
            props: { user }
        }
    }
);

const logout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    Router.push("/");
}

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
}

const AccountSettings = ({ user }) => (
    <div>
        <Head>
            <title>Account Settings</title>
            <meta name="description" content="Account Settings" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
            <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            <span className={styles.headerContent}>
                <button type="button" className={styles.headerButton}>Notifications</button>
                <Link href="/account_settings"><button type="button" className={styles.headerButton}>Settings</button></Link>
                <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
            </span>
        </header>

        <div className={styles.breadcrumb}>
            <Link href="/home">Home</Link>
        </div>

        <h1 className={styles.description}>
            Account Settings
        </h1>

        <main>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" value={user.username} />
                <br />
                <label className={styles.label}>Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" />
                <br />
                <label className={styles.label}>Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />
                <br />
                <input type="submit" value="Save Changes" />
            </form>
        </main>
    </div>
);

export default AccountSettings;

