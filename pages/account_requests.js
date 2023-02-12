import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";

export default function Home() {
    const [dataResponse, setdataResponse] = useState([]);

    const ApproveAccount = async (data) => {
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/approve_account';
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        alert("Account request has been Approved!");
        window.location.reload();
    } 

    const DenyAccount = async (data) => {
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/approve_account';
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        alert("Account request has been declined!");
        window.location.reload();
    }

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
                    <button type="button" className={styles.headerButton}>Logout</button>
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
                                        <button className={styles.approveButton} onClick={()=>ApproveAccount(account.account_id)}>Approve</button>
                                        <button className={styles.denyButton} onClick={()=>DenyAccount(account.account_id)}>Deny</button>
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

