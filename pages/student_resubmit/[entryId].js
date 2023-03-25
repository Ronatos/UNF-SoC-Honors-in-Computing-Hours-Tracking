import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip';
import Router from 'next/router'
import styles from '../../styles/Student.module.css'
import unfLogo from '../../public/UNF_Logo.gif';
import { server, withSessionSsr } from '../lib/config/withSession';

// student_resubmut/[entryId].js

// student_resubmit/4

// { params: { entryId: 4 } }

// now i have the try id, query the database for that entry, if found, 200 + data
// else 404

export const getServerSideProps = withSessionSsr(
    async ({req, res, params}) => {
        const user = req.session.user;
        const studentEntryResubmit = req.session.studentEntryResubmit;

        if(!user || user.role != 'student') {
            return {
                notFound: true,
            }
        }

        // we should probably refactor this to only fetch the data needed for this form
        // techincally it has everything we need to make the feature functional though
        const response = await fetch(server + '/api/student_form_build', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.username
            }),
        });
    
        const faculty_list_object = await response.json();
        const faculty_list = faculty_list_object.faculty_list;
        // we see entry list is in faculty_list_object.entry_list by lookign at submit_form_buid.ks
        // get the entryId param - params.entryId

        // find that entryid in the list - currentEntry
        
        const currentEntry = faculty_list_object.entry_list && faculty_list_object.entry_list.find(entry => entry.entry_id == params.entryId);
        
        // throw (or redirect / nice error)?:
        // - if entryId was not in database 
        // - already Approved/Denied? maybe - depends on customer
        // - req.session.user is not the entry_user

        return {
            props: { user, faculty_list, currentEntry }
        }
    }
);

const handleSubmit = async (event) => {
    event.preventDefault();

    // todo: make new route 
    const response = await fetch('/api/student_form_edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            entry_id: event.target.entry_id.value,
            // username: event.target.username.value,
            event: event.target.event.value,
            date: event.target.date.value,
            hours: event.target.hours.value,
            faculty_id: event.target.faculty_id.value,
            comment: event.target.comment.value
        }),
    });

    const result = await response.json();

    if (response.status == 200) {
        Router.push("/home");
    }
    else {
        alert(result.message);
    }
};

const logout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    Router.push("/");
}

function extractISODatePart(dbDate) {
    const date = new Date(dbDate) // Sat Mar 18 2023
    const iso = date.toISOString() // "2023-03-18T04:00:00.000Z" does not conform to the required format, "yyyy-MM-dd".
    const firstPart = iso.split("T")[0]
    return firstPart
}


const StudentForm = ({ user, faculty_list, currentEntry }) => (
// const studentEntryResubmit = sessionStorage.studentEntryResubmit;

    <div>
        <Head>
            <title>Submit Hours</title>
            <meta name="description" content="Submit Hours" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
            <Link href="/home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            <span className={styles.headerContent}>
                {/* Removed old links, they were not needed for production */}
                <button type="button" className={styles.headerButton} onClick={logout}>Logout</button>
            </span>
        </header>

        <div className={styles.breadcrumb}>
            <Link href="/home">Home</Link>
        </div>

        <h1 className={styles.description}>
                Resubmit Hours 
        </h1>

        <main>
            {/* <pre>{JSON.stringify({currentEntry}, undefined, 2)}</pre> */}
            <form onSubmit={handleSubmit} className={styles.description} method='post'>
    
                <input name="entry_id" type='hidden' className={styles.input} value={currentEntry.entry_id} readOnly/>
                {/* <input name="entry_id" type='hidden' className={styles.input} value={entry.entry_id} readOnly/> */}
                <input name='event' defaultValue={currentEntry.event_name} type="text" maxLength="255" placeholder="Event" className={styles.input} data-tip="The name of the event you attended." required/><ReactTooltip place="bottom"/>
                <br></br>
                <input name="hours" defaultValue={currentEntry.time_accrued} type="number" placeholder="Hours" className={styles.input} data-tip="The number of hours you attended the event. (No fractional hours will be accepted.)" required/><ReactTooltip place="bottom"/>
                <br></br>
                <input name="date" defaultValue={extractISODatePart(currentEntry.event_date)} onChange={(e => console.log("date", e.target.value))} type="date" className={styles.input} data-tip="The date you attended the event." required/><ReactTooltip place="bottom"/>
                <br></br>

                <select name="faculty_id" className={styles.input}>
                    {faculty_list.map((faculty) => (
                        <option key={faculty.account_id} value={faculty.account_id} selected={faculty.account_id === currentEntry.faculty_id}>{faculty.first_name} {faculty.last_name}</option>
                    ))}
                </select>
                <br></br>

                <textarea name="comment" maxLength="255" defaultValue={currentEntry.latest_comment} className={styles.input} placeholder="Additional comments for your instructor?" cols="50"></textarea>
                <br></br>
                <input type="submit" value="Submit"/>
                <input type="reset" value="Reset"/>
            </form>
        </main>
    </div>
);



export default StudentForm;
