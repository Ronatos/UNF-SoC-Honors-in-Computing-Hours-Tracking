import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Router from 'next/router'
import newFormIcon from '../public/new_form.png';
import viewFormsIcon from '../public/view_forms.png';
import { withSessionSsr, server } from './lib/config/withSession';

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

        if (user.role == 'student') {
            const response = await fetch(server + '/api/student_home_build', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                }),
            });

            const entry_list_package = await response.json();
            const entry_list = entry_list_package.entry_list;

            console.log(entry_list);
    
            return {
                props: { user, entry_list }
            }
        }

        if (user.role == 'faculty') {
            const response = await fetch(server + '/api/faculty_home_build', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                }),
            });
        
            const entry_list_package = await response.json();
            const entry_list = entry_list_package.entry_list;

            console.log(entry_list);
    
            return {
                props: { user, entry_list }
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

const updateForm = async(event) => {
    event.preventDefault();

    let Approve = "Approved";
    let Deny = "Denied";

    const response = await fetch('/api/update_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           
            entry_id: event.target.entry_id.value,
            entry_status: event.target.entry_status.value
        }),
    });
    window.location.reload(false);
}

const Home = ({ user, entry_list }) => {
    if (user.role == 'student') {
        if (entry_list.length == 0) {
            return (
                <div>
                    <Head>
                        <title>Student Home</title>
                        <meta name="description" content="Student home page" />
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

                    <main className={styles.main}>
                        <div>
                            <Link href="/student_form"><button type="button" className={styles.newFormButton}>Submit Hours to Instructor</button></Link>
                        </div>
                    </main>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Head>
                        <title>Student Home</title>
                        <meta name="description" content="Student home page" />
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

                    <main className={styles.main}>
                        <div>
                            <Link href="/student_form"><button type="button" className={styles.newFormButton}>Submit Hours to Instructor</button></Link>
                        </div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.container}>Faculty Name</th>
                                    <th className={styles.container}>Event</th>
                                    <th className={styles.container}>Event Date</th>
                                    <th className={styles.container}>Hours</th>
                                    <th className={styles.container}>Comment</th>
                                    <th className={styles.container}>Status</th>
                                    <th className={styles.container}>Action</th>
                                </tr>
                            </thead>
                            {entry_list.map((entry) => {
                                return (
                                    <tbody key={entry.entry_id}>
                                        {/* <form id="row" onSubmit={updateForm} method="post"> */}
                                            <tr className={styles.tableRow}>
                                                {/* <input name="entry_id" type="hidden" value={entry.entry_id} readOnly></input> */}
                                                <td className={styles.tableData}>{entry.last_name}, {entry.first_name}</td>
                                                <td className={styles.tableData}>{entry.event_name}</td>
                                                <td className={styles.tableData}>{entry.event_date}</td>
                                                <td className={styles.tableData}>{entry.time_accrued}</td>
                                                <td className={styles.tableData}>{entry.latest_comment}</td>
                                                <td className={styles.tableData}>{entry.entry_status}</td>
                                                <td>
                                                    {/* Needs work */}
                                                    {/* <button type="submit" form="row" className={styles.resubmitButton} value="resubmit">Resubmit</button> */}
                                                </td>
                                            </tr>
                                        {/* </form> */}
                                    </tbody>
                                );
                            })}
                        </table>

                    </main>
                </div>
            )
        }
    }
    else if (user.role == 'faculty') {
        if (entry_list.length == 0) {
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
                            <Link href="/account_settings"><button type="button" className={styles.headerButton}>Settings</button></Link>
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>
    
                    <main>
                        <h1 className={styles.description}>Nothing to work on right now. Check back later!</h1>
                    </main>
                </div>
            )
        }
        else {
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
                            <Link href="/account_settings"><button type="button" className={styles.headerButton}>Settings</button></Link>
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>
    
                    <main>
                        {/* Needs work */}
                        <div className={styles.description}>
                        <input type="text" id="input"  placeholder="Search for Submitted Forms" title="searchInput" className="search-input" data-table="entry-list"></input>
                        </div>

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

                            <tbody>
                                {entry_list.map((entry) => {
                                    return (                           
                                        <tr key={entry.entry_id} className={styles.tableRow}>
                                            <td className={styles.tableData}>{entry.last_name}, {entry.first_name}</td>
                                            <td className={styles.tableData}>{entry.event_name}</td>
                                            <td className={styles.tableData}>{entry.event_date}</td>
                                            <td className={styles.tableData}>{entry.time_accrued}</td>
                                            <td className={styles.tableData}>{entry.latest_comment}</td>
                                            <td>
                                                {/* <form onSubmit={updateForm} method="post">
                                                    <input name="entry_id" type="hidden" value={entry.entry_id} readOnly></input>
                                                    <input type="submit" className={styles.approveButton} name="new_status" value="Approve"/>
                                                    <input type="submit" className={styles.denyButton} name="new_status" value="Deny"/> 
                                                </form> */}
                                            <form onSubmit={updateForm} method="post">
                                            <input name="entry_id" type="hidden" value={entry.entry_id} readOnly></input>
                                            <input type="submit" className={styles.approveButton} name="entry_status" value="Approve"/>
                                            <input type="submit" className={styles.denyButton} name="entry_status" value="Deny"/>
                                        </form>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </main>
                </div>
            )
        }
    }
    else if (user.role == 'admin') {
        return (
            <div>
                <Head>
                    <title>Administrator Home</title>
                    <meta name="description" content="Administrator home page" />
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

                <main className={styles.description}>
                    <Link href="/account_requests"><button type="button" className={styles.approveButton}>Account Requests</button></Link>
                    <Link href="/reports"><button type="button" className={styles.approveButton}>View Reports</button></Link>
                    <Link href="/adminAccount"><button type="button" className={styles.approveButton}>View Accounts</button></Link>
                </main>
            </div>
        )
    }
};

export default Home;