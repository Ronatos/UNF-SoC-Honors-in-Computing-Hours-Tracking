import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
import Link from 'next/link'

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
            const response = await fetch('/api/entry_pull');
            const res = await response.json();
            console.log(res);
            setdataResponse(res.accounts);
        }

        getPageData();
    }, []);

    return (
        <div>
            <Head>
                <title>Reports</title>
                <meta name="description" content="Reports" />
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

                <div className={styles.description}>
                    <button type="button" className={styles.approveButton} onClick={()=>exportTableToExcel("tableID")}>Export</button>
                    <br></br>
                    <input type="text" id="input"  placeholder="Filter" className="search-input" data-table="reports-list" onChange={event => setQuery(event.target.value)}></input>
                </div>

                <table id="tableID" className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.container}>Entry ID</th>
                            <th className={styles.container}>Student ID</th>
                            <th className={styles.container}>Faculty ID</th>
                            <th className={styles.container}>Event Name</th>
                            <th className={styles.container}>Event Date</th>
                            <th className={styles.container}>Time Accrued</th>
                            <th className={styles.container}>Latest Comment</th>
                            <th className={styles.container}>Comment ID</th>
                            <th className={styles.container}>Entry Status</th>
                            <th className={styles.container}>Semester</th>
                        </tr>
                    </thead>

                    {dataResponse.filter(account => {
                        if (query === '') {
                            return account;
                        } 
                        if (account.latest_comment.toLowerCase().includes(query.toLowerCase())) {
                            return account;
                        }
                        if (account.event_name.toLowerCase().includes(query.toLowerCase())) {
                            return account;
                        }
                        if (account.entry_id.toString().includes(query.toLowerCase())) {
                            return account;
                        }
                        if (account.student_id.toString().includes(query.toLowerCase())) {
                            return account;
                        }
                        if (account.faculty_id.toString().includes(query.toLowerCase())) {
                            return account;
                        }
                        if (account.event_date.toString().includes(query.toLowerCase())) {
                            return account;
                        }
                    }).map((account) => {
                        return (
                            <tbody key={account.entry_id}>
                                <tr className={styles.tableRow}>
                                    <td className={styles.tableData}>{account.entry_id}</td>
                                    <td className={styles.tableData}>{account.student_id}</td>
                                    <td className={styles.tableData}>{account.faculty_id}</td>
                                    <td className={styles.tableData}>{account.event_name}</td>
                                    <td className={styles.tableData}>{account.event_date}</td>
                                    <td className={styles.tableData}>{account.time_accrued}</td>
                                    <td className={styles.tableData}>{account.latest_comment}</td>
                                    <td className={styles.tableData}>{account.latest_commentor_id}</td>
                                    <td className={styles.tableData}>{account.entry_status}</td> 
                                    <td className={styles.tableData}>{account.Semester}</td>
                                    <td className={styles.tableData}>{}</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </main>
        </div>
    )
}
    
  
