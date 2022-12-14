import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/admin.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
/*Reports Page
Shows unresolved reports


*/
export default function Home() {

  const [dataResponse, setdataResponse] = useState([]);

useEffect(() => {
  async function getPageData() {
    const apiURLEndpoint = '/api/entry_pull';
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
View Reports
</h1>
<input type="text" id="input"  placeholder="Search for reports" title="searchInput" className="search-input" data-table="reports-list"></input>

<table className={styles.table} id="tableID">
    <thead className={styles.head}>
  <tr>
  <th className={styles.thead}>Entry ID</th>
  <th className={styles.thead}>Student ID</th>
  <th className={styles.thead}>Faculty ID</th>
    <th className={styles.thead}>Event Name</th>
    <th className={styles.thead}>Event Date</th>
    <th className={styles.thead}>Time Accrued</th>
    <th className={styles.thead}>Latest Comment</th>
    <th className={styles.thead}>Comment ID</th>
    <th className={styles.thead}>Entry Status</th>
    <th className={styles.thead}>Semester</th>
  </tr>
  </thead>
  </table>

  {dataResponse.map((account) => {
  return (
<div key={account.entry_id}>
  <tbody>
<tr className={styles.trow}>
<td className={styles.tbody}>{account.entry_id}</td>
<td className={styles.tbody}>{account.student_id}</td>
<td className={styles.tbody}>{account.faculty_id}</td>
<td className={styles.tbody}>{account.event_date}</td>
<td className={styles.tbody}>{account.time_accrued}</td>
<td className={styles.tbody}>{account.latest_comment}</td>
<td className={styles.tbody}>{account.latest_commentor_id}</td>
<td className={styles.tbody}>{account.entry_status}</td>
<td className={styles.tbody}>{}</td>
</tr>
</tbody>
</div>
  );
})}

</main>
</div>
    )
  }
    
  
