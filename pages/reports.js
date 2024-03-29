import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
import Link from 'next/link'
import moment from "moment";
import Router from 'next/router'
import { server, withSessionSsr } from '../lib/withSession';




export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user || user.role != 'admin') {
            return {
                notFound: true,
            }
        }

        return {
            props: { user,  },
        }
    }
);


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

const AdministratorReport = ({ user, faculty_list }) => {

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

    const logout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        Router.push("/");
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
            </Head>
      
            <header className={styles.header}>
                        <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                        <span className={styles.headerContent}>
                            {/* Removed old links, they were not needed for production */}
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>

            {/* <header className={styles.header}>
                <Link href="/home">
                    <div>
                    <Image className={styles.image} src={unfLogo} alt="UNF"/>
                    </div>
                    </Link>
                <span className={styles.headerContent}>
                    {/* Removed old links, they were not needed for production */}
                    {/* <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                </span> */}
            {/* </header> */}
      
            <main>
               

               

                <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">


    <Link href="/home">Home</Link>
   

    <form className="d-flex input-group w-auto">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        data-table="reports-list"
        onChange={event => setQuery(event.target.value)}
      />
    </form>
    <div className="d-flex align-items-center">
        <button type="button" className={styles.approveButton} onClick={()=>exportTableToExcel("tableID")}>
          Export
        </button>
      </div>
  </div>
</nav>


                <table className="table table-hover table-bordered align-middle" id="tableID">
                    <thead className="thead-light">
                        <tr>
                            <th onClick={()=>sortingInt("entry_id")}className={styles.container}>Entry ID</th>
                            <th onClick={()=>sortingInt("student_id")}className={styles.container}>Student ID</th>
                            <th onClick={()=>sortingInt("faculty_id")}className={styles.container}>Faculty ID</th>
                            <th onClick={()=>sorting("event_name")} className={styles.container}>Event Name</th>
                            <th onClick={()=>sortingInt("event_date")}className={styles.container}>Event Date</th>
                            <th  onClick={()=>sortingInt("time_accrued")}className={styles.container}>Time Accrued</th>
                            <th onClick={()=>sorting("latest_comment")}className={styles.container}>Latest Comment</th>
                            <th onClick={()=>sorting("entry_status")}className={styles.container}>Entry Status</th>
                          
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
                                    <td className={styles.tableData}>{moment(account.event_date).utc().format('YYYY-MM-DD')}</td>
                                    <td className={styles.tableData}>{account.time_accrued}</td>
                                    <td className={styles.tableData}>{account.latest_comment}</td>
                                    <td className={styles.tableData}>{account.entry_status}</td> 
                                   
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
export default AdministratorReport;
  
