import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
import SortTable from '.'


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

    const updateForm = async(event, id) => {
        // event.preventDefault();
    
        const response = await fetch('/api/update_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     account_id: event.target.account_id.value,
            //     action: event.target.action.value
            // }),
            body: JSON.stringify({
                account_id: id,
                action: event
               
            }),
        });
        window.location.reload(false);
    }

    return (
        <div>
            <Head>
                <title>New Account Requests</title>
                <meta name="description" content="New Account Requests" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
            </Head>
      
            <header className={styles.header}>
                <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                <span className={styles.headerContent}>
                    {/* Removed old links, they were not needed for production */}
                    <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                </span>
            </header>
      
            <main>
                <div className={styles.breadcrumb}>
                    <Link href="/home">Home</Link>
                </div>

                <table class="table table-hover table-bordered" className={styles.table} id="tableID">
                    <thead class="thead-light">
                        <tr>
                            <th className={styles.container}>Username</th>
                            <th className={styles.container}>Name</th>
                            <th className={styles.container}>Email</th>
                            <th className={styles.container}>Role</th>
                            <th className={styles.container}>Status</th>
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
                                    <td className={styles.tableData}>{account.account_status}</td>
                                    <td>
                                        {/* <form onSubmit={updateForm} method="post">
                                            <input name="account_id" type="hidden" value={account.account_id} readOnly></input>
                                            <input type="submit" className={styles.approveButton} name="action" value="Approve"/>
                                            <input type="submit" className={styles.denyButton} name="action" value="Deny"/>
                                        </form> */}
                                        <button value="Approve" onClick={event => updateForm(event.target.value, account.account_id)} className={styles.approveButton}>
                                            Approve
                                        </button>
                                        <button value="Deny" onClick={event => updateForm(event.target.value, account.account_id)} className={styles.denyButton}>
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </main>
        </div>
    )
}

