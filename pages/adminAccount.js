import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/admin.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
/*Reports Page
Shows unresolved reports
'http://localhost:3000/api/getAccounts'


*/
export default function searchFunction(document) {
const [dataResponse, setdataResponse] = useState([]);

useEffect(() => {
  async function getPageData() {
    const apiURLEndpoint = '/api/getAccounts';
    const response = await fetch(apiURLEndpoint);
    const res = await response.json();
    console.log(res);
  setdataResponse(res.accounts);
  }

getPageData();
}, []);
  return (
<div className={styles.container}>
      <Head>
        <title>AdminReports</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
                <Image src={unfLogo} alt="UNF"/>
            </header>
      <main className={styles.main}>
<h1 className={styles.title}>
View Accounts
</h1>
<input type="text" id="input" placeholder="Filter" title="searchInput" className="search-input" data-table="reports-list"></input>
<table className={styles.table} id="tableID">
    <thead className={styles.head}>
  <tr>
  <th className={styles.thead}>Account ID</th>
  <th className={styles.thead}>Role</th>
  <th className={styles.thead}>First Name</th>
    <th className={styles.thead}>Last Name</th>
    <th className={styles.thead}>UserName</th>
    <th className={styles.thead}>Password</th>
    <th className={styles.thead}>Email</th>
    <th className={styles.thead}>Account Status</th>
  </tr>
  </thead>
  </table>

  {dataResponse.map((account) => {
  return (
<div>
  <tbody>
<tr className={styles.trow}>
<td className={styles.tbody}>{account.account_id}</td>
<td className={styles.tbody}>{account.role}</td>
<td className={styles.tbody}>{account.first_name}</td>
<td className={styles.tbody}>{account.last_name}</td>
<td className={styles.tbody}>{account.username}</td>
<td className={styles.tbody}>{account.password}</td>
<td className={styles.tbody}>{account.email_address}</td>
<td className={styles.tbody}>{account.account_status}</td>
</tr>
</tbody>
</div>
  );
})}

</main>
</div>

    )
  }
    
  