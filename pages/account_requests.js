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
            </Head>
      
            <header className={styles.header}>
                <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                <span className={styles.headerContent}>
                    {/* Removed old links, they were not needed for production */}
                    <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                </span>
            </header>
      
            <main>
               

                <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">

  <a class="nav-link active" aria-current="page">
    <Link href="/home">Home</Link>
    </a>
  </div>
</nav>



                <table className="table table-hover table-bordered" id="tableID">
                    <thead className="thead-light">
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
            </main>
        </div>
    )
}

