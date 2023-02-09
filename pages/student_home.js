import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif';
import newFormIcon from '../public/new_form.png';
import viewFormsIcon from '../public/view_forms.png';

export default function Home() {
    return (
      <div>
            <Head>
                <title>Student Home</title>
                <meta name="description" content="Student home page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Link href="/student_home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
            </header>

            <main className={styles.main}>
                <span className={styles.navSelector}>
                    <div className={styles.navIcon}>
                        <Link href="/student_form"><Image src={newFormIcon} alt="New Form"/></Link>
                    </div>
                    <h2 className={styles.description} style={{margin: "5%"}}>Submit Hours</h2>
                </span>

                <div className={styles.navSelector}>
                    <div className={styles.navIcon} style={{width: "50%"}}>
                        <Link href="/student_submitted_forms"><Image src={viewFormsIcon} alt="View Submitted Hours"/></Link>
                    </div>
                    <h2 className={styles.description} style={{margin: "5%"}}>View Submitted Hours</h2>
                </div>
            </main>
        </div>
    );
}
