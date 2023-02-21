import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";

export default function Home() {
    const [dataResponse, setdataResponse] = useState([]);

    useEffect(() => {
        async function getPageData() {
            const apiURLEndpoint = '/api/account_request_pull';
            const response = await fetch(apiURLEndpoint);
            const res = await response.json();
            console.log(res);
            setdataResponse(res.accounts);
        }
    
        getPageData();
    }, []);

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
    
        const response = await fetch('/api/update_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_id: event.target.account_id.value,
                action: event.target.action.value
            }),
        });
        window.location.reload(false);
    }

    return (
        <div>
            <Head>
                <title>New Account Requests</title>
                <meta name="description" content="New Account Requests" />
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
                <div className={styles.breadcrumb}>
                    <Link href="/home">Home</Link>
                </div>

                <table className={styles.table} id="tableID">
                    <thead>
                        <tr>
                            <th className={styles.container}>Username</th>
                            <th className={styles.container}>Name</th>
                            <th className={styles.container}>Email</th>
                            <th className={styles.container}>Role</th>
                            <th className={styles.container}>Action</th>
                        </tr>
                    </thead>

                    {dataResponse.map((account) => {
                        return (
                            <tbody key={account.account_id}>
                                <tr className={styles.tableRow}>
                                    <td className={styles.tableData}>{account.username}</td>
                                    <td className={styles.tableData}>{account.last_name}, {account.first_name}</td>
                                    <td className={styles.tableData}>{account.email_address}</td>
                                    <td className={styles.tableData}>{account.role}</td>
                                    <td>
                                        <form onSubmit={updateForm} method="post">
                                            <input name="account_id" type="hidden" value={account.account_id} readOnly></input>
                                            <input type="submit" className={styles.approveButton} name="action" value="Approve"/>
                                            <input type="submit" className={styles.denyButton} name="action" value="Deny"/>
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

