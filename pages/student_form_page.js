import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/students.module.css'
// for form input information 
import {useState} from 'react'
 
// the new student page - started over 



export default function Home() {

    // use the useState hook to store the form data
    const [name, setName] = useState('');

    // handle the form input change
    const onChange = (e) => {
      const { value } = e.target;
      setName(value);
    }

    const showData = () => {
      console.log('Name: ', name);
    }

    return (
        <div className={styles.container}>
      <Head>
        <title>Student - Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* the unf header - use the basic style */}
      <header className={styles.header}> 
        <Image className={styles.logo} src="/UNF_Logo.gif" alt="UNF" width={100} height={100}/>
          <div className={styles.link}>
              <div className={styles.links}>
                <Link href="/settings">Noti</Link>
                <Link href="/settings">Settings</Link>
              </div>
              
          </div> 

      </header>

      <main className={styles.main}>
        
        <div className={styles.student_form}>
          <form className={styles.form_element}>
            <label className={styles.form_label}>Student First Name:</label>
            <input onChange={onChange} className={styles.form_input} type="text" name="name" id="left_form" />
            <br></br>
            <label>Student Last Name:</label>
            <input className={styles.form_input} type="text" name="name" />
            <br></br>
            <label>Event:</label>
            <input className={styles.form_input} type="text" name="name" />
            <br></br>
            <input type="radio" name="event" value="Freshman" />
            <label for="event">FR</label>

            <input type="radio" name="event" value="Sophomore" />
            <label for="event">SOPH</label>

            <input type="radio" name="event" value="Junior" />
            <label for="event">JR</label>

            <input type="radio" name="event" value="Senior" />
            <label for="event">Senior</label>
            <br></br>
            <div className={styles.right_form}>
            <label for="quantity">Hours Amount:</label>
            <input className={styles.form_input} type="number" id="quantity" name="quantity" min="1" max="50" />
            <br></br>
            <label for="text">Professor:</label>
            <input className={styles.form_input} type="text" name="name" />
            <br></br>
            <label for="notes_review">Notes:</label>
            <br></br>
            <textarea  className={styles.form_text} id="notes_review" placeholder="Add any notes here about the event..." name="notes_review" rows="4" cols="50">
              
            </textarea>
          
          <div className={styles.btn_container}>
            <button onClick={showData} className={styles.form_btn}>Submit</button>
            <button className={styles.form_btn1}>Clear</button>
          </div>
        </div>
      </form>
      <div className={styles.queue}> 
        <h3 className={styles.queue_text}>Queue:</h3>
          <div className={styles.queue_container}>
          <a href='#' className={styles.link_text}>Fall20</a>
          <a href='#' className={styles.link_text1}>Sp21</a>
          <a href='#' className={styles.link_text}>Su20</a>
          <a href='#' className={styles.link_text1}>Fall19</a>
          <a href='#' className={styles.link_text}>Su19</a>
          <a href='#' className={styles.link_text1}>Fall21</a>
          <a href='#' className={styles.link_text}>Sp22</a>
          <a href='#' className={styles.link_text1}>Su21</a>
          <a href='#' className={styles.link_text}>Fall22</a>
          <a href='#' className={styles.link_text}>Sp23</a>
          </div>
      </div>
    </div>
  </main>
</div>
    )
}

