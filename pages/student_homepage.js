import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import styles from '../styles/student.module.css'
import Link from 'next/link'

// import '../styles/setting.css'
// import "\bootstrap\dist\css\bootstrap.min.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Student - Homepage</title>
        <meta name="description" content="The settings page for UNF Leadership" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>

      
      <header className={styles.header}>
                <Image className={styles.logo} src={unfLogo} alt="UNF"/>
                <div className={styles.link}> 

                  <Link href="/student_homepage">Noti</Link>
                  <br></br>
                  <Link href="/settings">Settings</Link>

                </div>
      </header>
      
      <main>
      <div className={styles.container}>
        
        <button className={styles.btn}>
          Create New
        </button>
        
      </div> 
      
      <div className={styles.student_form}>
        hi
      </div>

      <div className={styles.queue}>
        yooo
      </div>

      <div className={styles.footer}>
        foot
      </div>
         
      
      {/* <div class="card-body tab-content">
              <div class="tab-pane active" id="profile">
                <h6>YOUR PROFILE INFORMATION</h6>
                <hr></hr>
                <form>
                  <div class="form-group">
                    <label for="fullName">Full Name:</label>
                    <input type="text" class="form-control" id="fullName" aria-describedby="fullNameHelp" placeholder="Enter your fullname" value="Kenneth Valdez" />
                    <small id="fullNameHelp" class="form-text text-muted">Your name may appear around here where you are mentioned. You can change or remove it at any time.</small>
                  </div>
                  <br></br>
                  <div class="form-group">
                    <label for="bio">Your Bio:</label>
                    <textarea class="form-control" id="bio" rows="3" placeholder="Write something about yourself" value="I am a student at the University of North Florida. I am currently studying Computer Science."></textarea>
                    <br></br>
                    <button type="button" class="btn btn-primary">Save</button>
                  </div>
                  <br></br>
                  <div class="form-group">
                    <label for="location">Location:</label>
                    <input type="text" class="form-control" id="location" placeholder="Enter your location" value="Bay Area, San Francisco, CA"/>
                  </div>
                  <div class="form-group small text-muted">
                    All of the fields on this page are optional and can be deleted at any time, and by filling them out, you&apos;re giving us consent to share this data wherever your user profile appears.
                  </div>
                  <button type="button" class="btn btn-primary">Update Profile</button>
                  <button style={{
                    marginLeft: '10px'
                  }} type="reset" class="btn btn-light">Reset Changes</button>

                </form>
      </div>        

      
        </div> */}
      </main>
    </div>
  )

}


