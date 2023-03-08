import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
import Link from 'next/link'
/*Reports Page
Shows unresolved reports
'http://localhost:3000/api/getAccounts'


*/

function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}
export default function Home() {
const [query, setQuery] = useState("")
const [dataResponse, setdataResponse] = useState([]);

useEffect(() => {
  async function getPageData() {
    const response = await fetch('/api/get_accounts');
    const res = await response.json();
    console.log("Output:",res);
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
<input type="text" id="input" placeholder="Filter" title="searchInput" className="search-input" data-table="reports-list" onChange={event => setQuery(event.target.value)}></input>
<button onClick={()=>exportTableToExcel("tableID")}>Excel</button>
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

  {dataResponse.filter(account => {
    if (query === '') {
      return account;
    } 
    if (account.role.toLowerCase().includes(query.toLowerCase())) {
      return account;
    }
    if (account.first_name.toLowerCase().includes(query.toLowerCase())) {
      return account;
    }
    if (account.last_name.toLowerCase().includes(query.toLowerCase())) {
      return account;
    }
    if (account.username.toString().includes(query.toLowerCase())) {
      return account;
    }
    if (account.password.toString().includes(query.toLowerCase())) {
      return account;
    }
    if (account.account_id.toString().includes(query.toLowerCase())) {
      return account;
    }
    if (account.email_address.toString().includes(query.toLowerCase())) {
      return account;
    }
    if (account.account_status.toLowerCase().includes(query.toLowerCase())) {
      return account;
    }
    }).map((account) => {
  return (
<div key={account.account_id}>
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
    
  
