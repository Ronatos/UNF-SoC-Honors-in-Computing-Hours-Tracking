import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import '../styles/setting.css'
// import "\bootstrap\dist\css\bootstrap.min.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ACCOUNT INFO</title>
        <meta name="description" content="The settings page for UNF Leadership" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>

     


      <main>

      
        
         
        <div className='container'>
          {/* nav bar account info */}
          <nav className='top-nav'>
            <ul style={{ 
              listStyleType: 'none',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
             }}>

              <li style={{
                float: 'left'
              }}>
                <a style={{

                }} href='#' target={"_blank"}>Project Settings</a></li>
              <li><a href='#' target={"_blank"}>Home</a></li>
              <li ><a href='#' target={"_blank"}>Login</a></li>
            </ul>
          </nav>

        
        
        
        </div>

  
      <div style={{ textAlign: 'center' }}>   
        <h1>ACCOUNT INFO</h1>
        <br></br>
        <h5>GENERAL INFORMATION</h5>
      </div>

      <div className='container'>
        <div className='leftbox'>
          <nav> 
            <a className="tab active"></a>
            <i className="fa fa-user"></i>


          </nav>
        </div>
      </div>    
      

    

      
   
      </main>
    </div>
  )
}



