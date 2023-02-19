import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/Home.module.css';

export default class FacultyHome extends React.Component {
    logout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        Router.push("/");
    }

    render() {
        if (this.props.entry_list.length == 0) {
            return (
                <div>
                    <Head>
                        <title>Faculty Home</title>
                        <meta name="description" content="Faculty home page" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
    
                    <header className={styles.header}>
                        <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                        <span className={styles.headerContent}>
                            <button type="button" className={styles.headerButton}>Notifications</button>
                            <button type="button" className={styles.headerButton}>Settings</button>
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>
    
                    <main>
                        <h1 className={styles.description}>Nothing to work on right now. Check back later!</h1>
                    </main>
                </div>
            )
        }

        return (
            <div>
                <Head>
                    <title>Faculty Home</title>
                    <meta name="description" content="Faculty home page" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <header className={styles.header}>
                    <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                    <span className={styles.headerContent}>
                        <button type="button" className={styles.headerButton}>Notifications</button>
                        <button type="button" className={styles.headerButton}>Settings</button>
                        <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                    </span>
                </header>

                <main>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.container}>Student Name</th>
                                <th className={styles.container}>Event</th>
                                <th className={styles.container}>Event Date</th>
                                <th className={styles.container}>Hours</th>
                                <th className={styles.container}>Comment</th>
                                <th className={styles.container}>Status</th>
                            </tr>
                        </thead>
                        {entry_list.map((entry) => {
                            return (
                                <tbody key={entry.entry_id}>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableData}>{entry.last_name}, {entry.first_name}</td>
                                        <td className={styles.tableData}>{entry.event_name}</td>
                                        <td className={styles.tableData}>{entry.event_date}</td>
                                        <td className={styles.tableData}>{entry.time_accrued}</td>
                                        <td className={styles.tableData}>{entry.latest_comment}</td>
                                        <td>
                                            <form onSubmit={updateForm} method="post">
                                                <input name="entry_id" type="hidden" value={entry.entry_id} readOnly></input>
                                                <input type="submit" className={styles.approveButton} name="new_status" value="Approved"/>
                                                <input type="submit" className={styles.denyButton} name="new_status" value="Denied"/>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </main>
            </div>
        )
    }
}