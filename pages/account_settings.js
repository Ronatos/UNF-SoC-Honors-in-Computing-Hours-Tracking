import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import styles from '../styles/Settings.module.css'





export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Settings</title>
        <meta name="description" content="The settings page for UNF Leadership" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>

    <div className={styles.container}>
      <main className={styles.main}>
        {/* <div className={styles.column}>
          <div className={styles.row}>
            <Image className={styles.avatar} src="/img_avatar.png" alt="UNF" width={100} height={100}/>
            <p className={styles.user_name}>Joe Snow</p>
          </div>
        </div> */}
          {/* <div className={styles.column1}>
            <h1>Account Settings</h1>
            <p>form text here</p>
          </div> */}
          

          <div className={styles.settings}>
            <h1>Get email updates when:</h1>
          <form className={styles.form_main}>
            <label className={styles.label}>
              <input type="checkbox" name="name" value="new_event" />
              <span className={styles.form_item}>Your form is denied.</span>
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="name" value="new_event" />
              <span className={styles.form_item}>Your form is approved</span>
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="name" value="new_event" />
              <span className={styles.form_item}>Information is invalid</span>
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="name" value="new_event" />
              <span className={styles.form_item}>Incorrect documents</span>
            </label>
            
          
            <div className={styles.settings_content}>
              <p>You may also receive other email notifications <br></br> your admin configured. <a href="#">Learn more</a></p>
            </div>
         

            <div className={styles.settings_footer}>
              <h1>Update format</h1>
              <label>
                <input type="radio" name="sendType" id="" checked/>
                <span>Email</span>
              </label>
              <label>
                <input type="radio" name="sendType" id=""/>
                <span>Text</span>
              </label>

              {/* submit btn for settings */}
              <div className={styles.send}>
                <input type="submit" value="Save"/>
              </div>
            <div className={styles.setting_links}>
              <a href='#' className={styles.tab}>Account</a>
              <a href='#' className={styles.tab}>Password</a>
              <a href='#' className={styles.tab}>Notifications</a>
            </div>
            </div>
          </form>
    
  </div>
</main>
</div>
</div>

  )

}



