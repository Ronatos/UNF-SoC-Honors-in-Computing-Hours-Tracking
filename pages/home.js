import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import { useState } from 'react';
import Router from 'next/router'
import newFormIcon from '../public/new_form.png';
import viewFormsIcon from '../public/view_forms.png';
import { withSessionSsr, server } from './lib/config/withSession';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'

export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user) {
            return {
                notFound: true,
            }
        }

        if (user.role == 'student') {
            const response = await fetch(server + '/api/student_home_build', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                }),
            });

            const entry_list_package = await response.json();
            const entry_list = entry_list_package.entry_list;

            
    
            return {
                props: { user, entry_list }
            }
        }

        if (user.role == 'faculty') {
            const response = await fetch(server + '/api/faculty_home_build', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                }),
            });
        
            const entry_list_package = await response.json();
            const entry_list = entry_list_package.entry_list;

            
    
            return {
                props: { user, entry_list }
            }
        }

        return {
            props: { user, entry_list}
        }
    }
);


const logout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    Router.push("/");
}

async function submitApproval(entry_id, new_status) {
    const resp = await fetch('/api/update_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({


            // new_status: event.target.new_status.value
            entry_id: entry_id,
            new_status: new_status


        }),
    })
    // todo: replace reload with changing list in state
    if (resp.ok) {
        window.location.reload(false);
    } {
        const errorBody = await resp.text()
        console.error("Unexpected response from server when submitting approval.", errorBody)
    }
}



function ApproveDenyEntry({ entryId }) {
    // show if not null, hide if null
    // shove in state = Approve, Deny
    const [approvalType, startApprovalForType] = useState(null);
    

    const handleClose = () => startApprovalForType(null);
    const verifyApprove = () => startApprovalForType("Approve");
    const verifyDeny = () => startApprovalForType("Deny");
    const onVerified = () => submitApproval(entryId, approvalType)
  
    return (
      <>
        <button className={styles.approveButton} onClick={verifyApprove}>
            Approve
        </button>
        <button className={styles.denyButton} onClick={verifyDeny}>
            Deny
        </button>
  
        <Modal show={approvalType !== null} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to {approvalType}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onVerified}>
              {approvalType}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  const updateForm = async(event) => {
    event.preventDefault();

    let Approve = "Approved";
    let Deny = "Denied";

    const response = await fetch('/api/update_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            entry_id: event.target.entry_id.value,
            // new_status: event.target.new_status.value
            entry_status: event.target.entry_status.value
        }),
    });
    window.location.reload(false);
}
  
const Home = ({ user, entry_list }) => {
    // put the entry list in state
    // when Approve or Deny happens, we know the id, so we can filter the list and get rid of it

    if (user.role == 'student') {
        if (entry_list.length == 0) {
            return (
                <div>
                    <Head>
                        <title>Student Home</title>
                        <meta name="description" content="Student home page" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <header className={styles.header}>
                        <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                        <span className={styles.headerContent}>
                            {/* Removed old links, they were not needed for production */}
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>

                    <main className={styles.main}>
                        <div>
                            <Link href="/student_form"><button type="button" className={styles.newFormButton}>Submit Hours to Instructor</button></Link>
                        </div>
                    </main>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Head>
                        <title>Student Home</title>
                        <meta name="description" content="Student home page" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <header className={styles.header}>
                        <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                        <span className={styles.headerContent}>
                            {/* Removed old links, they were not needed for production */}
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>

                    <main className={styles.main}>
                        <div>
                            <Link href="/student_form"><button type="button" className={styles.newFormButton}>Submit Hours to Instructor</button></Link>
                        </div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.container}>Faculty Name</th>
                                    <th className={styles.container}>Event</th>
                                    <th className={styles.container}>Event Date</th>
                                    <th className={styles.container}>Hours</th>
                                    <th className={styles.container}>Comment</th>
                                    <th className={styles.container}>Status</th>
                                    <th className={styles.container}>Action</th>
                                </tr>
                            </thead>
                            {entry_list.map((entry) => {
                                return (
                                    <tbody key={entry.entry_id}>
                                        {/* <form id="row" onSubmit={updateForm} method="post"> */}
                                            <tr className={styles.tableRow}>
                                                {/* <td name="entry_id" type="hidden" value={entry.entry_id} readOnly>{entry.entry_id}</td> */}
                                                <td className={styles.tableData}>{entry.last_name}, {entry.first_name}</td>
                                                <td className={styles.tableData}>{entry.event_name}</td>
                                                <td className={styles.tableData}>{entry.event_date}</td>
                                                <td className={styles.tableData}>{entry.time_accrued}</td>
                                                <td className={styles.tableData}>{entry.latest_comment}</td>
                                                <td className={styles.tableData}>{entry.entry_status}</td>
                                                <td>
                                                    {/* { entry.entry_status === "Unreviewed" && <p>Only shown if unreviewed</p> } */}
                                                    
                                                    { entry.entry_status === "Unreviewed" && <Link href={`/student_resubmit/${entry.entry_id}`}><button type="button" onClick={() => {
                                                        sessionStorage.studentEntryResubmit = entry;
                                                    }} className={styles.newFormButton} >Edit Hours</button></Link> }
                                                </td>
                                            </tr>
                                        {/* </form> */}
                                    </tbody>
                                );
                            })}
                        </table>

                    </main>
                </div>
            )
        }
    }
    else if (user.role == 'faculty') {
        if (entry_list.length == 0) {
            return (
                <div>
                    <Head>
                        <title>Faculty Home</title>
                        <meta name="description" content="Faculty home page" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
    
                    <header className={styles.header}>
                        <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                        <span className={styles.headerContent}>
                            {/* Removed old links, they were not needed for production */}
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>
    
                    <main>
                        <h1 className={styles.description}>Nothing to work on right now. Check back later!</h1>
                    </main>
                </div>
            )
        }
        else {
            const [studentSearchString, setStudentSearchString] = useState("")
            // have an input box onChange call setStudentSearchString
            const localEntryList = 
                studentSearchString === "" ? entry_list : entry_list.filter(e => { 
                    const search = studentSearchString.toUpperCase()
                    return e.first_name.toUpperCase().includes(search) ||  e.last_name.toUpperCase().includes(search) || e.event_name.toUpperCase().includes(search)
                })

            return (
                <div>
                    <Head>
                        <title>Faculty Home</title>
                        <meta name="description" content="Faculty home page" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
    
                    <header className={styles.header}>
                        <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                        <span className={styles.headerContent}>
                            {/* Removed old links, they were not needed for production */}
                            <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                        </span>
                    </header>
    
                    <main>

                        {/* Needs work */}
                        {/* <input type="text" id="input"  placeholder="Search for Submitted Forms" title="searchInput" className="search-input" data-table="reports-list"></input> */}

                        <div className={styles.description}>
                        <input type="text" id="input"  onChange={(e) => setStudentSearchString(e.target.value)}  placeholder="Search Submitted Forms" title="searchInput" className="search-input" data-table="entry-list"></input>
                        </div>
    
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.container}>Student Name</th>
                                    <th className={styles.container}>Event</th>
                                    <th className={styles.container}>Event Date</th>
                                    <th className={styles.container}>Hours</th>
                                    <th className={styles.container}>Comment</th>
                                    <th className={styles.container}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {localEntryList.map((entry) => {
                                    return (                           
                                        <tr key={entry.entry_id} className={styles.tableRow}>
                                            <td className={styles.tableData}>{entry.last_name}, {entry.first_name}</td>
                                            <td className={styles.tableData}>{entry.event_name}</td>
                                            <td className={styles.tableData}>{entry.event_date}</td>
                                            <td className={styles.tableData}>{entry.time_accrued}</td>
                                            <td className={styles.tableData}>{entry.latest_comment}</td>
                                            <td>


                                        
                                                <ApproveDenyEntry entryId={entry.entry_id} />

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </main>
                </div>
            )
        }
    }
    else if (user.role == 'admin') {
        return (
            <div>
                <Head>
                    <title>Administrator Home</title>
                    <meta name="description" content="Administrator home page" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <header className={styles.header}>
                    <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
                    <span className={styles.headerContent}>
                        {/* Removed old links, they were not needed for production */}
                        <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
                    </span>
                </header>

                <main className={styles.description}>
                    <Link href="/account_requests"><button type="button" className={styles.approveButton}>Account Requests</button></Link>
                    <Link href="/reports"><button type="button" className={styles.approveButton}>View Reports</button></Link>
                    <Link href="/adminAccount"><button type="button" className={styles.approveButton}>View Accounts</button></Link>
                </main>
            </div>
        )
    }
};

export default Home;