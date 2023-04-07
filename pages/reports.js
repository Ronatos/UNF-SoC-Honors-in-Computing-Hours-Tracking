import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
import Link from 'next/link'
import moment from "moment";


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

    const [order, setOrder] = useState("ASC")
    const sorting =(col)=>{
      if (order === "ASC") {
        const sorted = [...dataResponse].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setdataResponse(sorted);
        setOrder("DSC")
    }
    
    if (order === "DSC") {
      const sorted = [...dataResponse].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setdataResponse(sorted);
      setOrder("ASC")
    };
    }
    
    const sortingInt =(col)=>{
      if (order === "ASC") {
        const sorted = [...dataResponse].sort((a,b)=>
        a[col] > b[col] ? 1 : -1
        );
        setdataResponse(sorted);
        setOrder("DSC")
    }
    
    if (order === "DSC") {
      const sorted = [...dataResponse].sort((a,b)=>
      a[col] < b[col] ? 1 : -1
      );
      setdataResponse(sorted);
      setOrder("ASC")
    };
    }

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
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
            </Head>
      
            <header className={styles.header}>
                <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                <span className={styles.headerContent}>
                    {/* Removed old links, they were not needed for production */}
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

                <table class="table table-hover table-bordered" id="tableID" className={styles.table}>
                    <thead class="thead-light">
                        <tr>
                            <th onClick={()=>sortingInt("entry_id")}className={styles.container}>Entry ID</th>
                            <th onClick={()=>sortingInt("student_id")}className={styles.container}>Student ID</th>
                            <th onClick={()=>sortingInt("faculty_id")}className={styles.container}>Faculty ID</th>
                            <th onClick={()=>sorting("event_name")} className={styles.container}>Event Name</th>
                            <th onClick={()=>sortingInt("event_date")}className={styles.container}>Event Date</th>
                            <th  onClick={()=>sortingInt("time_accrued")}className={styles.container}>Time Accrued</th>
                            <th onClick={()=>sorting("latest_comment")}className={styles.container}>Latest Comment</th>
                            <th onClick={()=>sortingInt("comment_id")}className={styles.container}>Comment ID</th>
                            <th onClick={()=>sorting("entry_status")}className={styles.container}>Entry Status</th>
                            <th onClick={()=>sorting("semester")}className={styles.container}>Semester</th>
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
                        if (account.semester.toLowerCase().includes(query.toLowerCase())) {
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
                                    <td className={styles.tableData}>{moment(account.event_date).utc().format('YYYY-MM-DD')}</td>
                                    <td className={styles.tableData}>{account.time_accrued}</td>
                                    <td className={styles.tableData}>{account.latest_comment}</td>
                                    <td className={styles.tableData}>{account.latest_commentor_id}</td>
                                    <td className={styles.tableData}>{account.entry_status}</td> 
                                    <td className={styles.tableData}>{account.semester}</td>
                                    <td className={styles.tableData}>{}</td>
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
    
  
