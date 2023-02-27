import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip';
import Router from 'next/router'
import styles from '../styles/Student.module.css'
import unfLogo from '../public/UNF_Logo.gif';
import { server, withSessionSsr } from './lib/config/withSession';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('General');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Settings</title>
        <meta name="description" content="The settings page for UNF Leadership" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
        <div className={styles.settings}>
            <h1 className={styles.title}>Settings</h1>
            <div className={styles.tabsContainer}>
              <div
                className={`${styles.tab} ${activeTab === 'General' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('General')}
              >
                General
              </div>
              <div
                className={`${styles.tab} ${activeTab === 'Profile' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('Profile')}
              >
                Profile
              </div>
              <div
                className={`${styles.tab} ${activeTab === 'Appearance' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('Appearance')}
              >
                Appearance
              </div>
            </div>
            {activeTab === 'General' && (
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  ref={register({ required: true })}
                  className={styles.input}
                />
                {errors.username && <p className={styles.error}>Username is required</p>}
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  ref={register({ required: true })}
                  className={styles.input}
                />
                {errors.email && <p className={styles.error}>Email is required</p>}
                <button type="submit" className={styles.submitBtn}>Update General Settings</button>
              </form>
            )}
            {activeTab === 'Profile' && (
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  ref={register({ required: true })}
                  className={styles.input}
                />
                {errors.fullName && <p className={styles.error}>Full Name is required</p>}
                
                <input
                  name="birthday"
                  type="date"
                  placeholder="Birthday"
                  ref={register({ required: true })}
                  className={styles.input}
                />
                {errors.birthday && <p className={styles.error}>Birthday is required</p>}
                <textarea
                  name="bio"
                  placeholder="Bio"
                  ref={register({ required: true })}
                  className={styles.textarea}
                />
                {errors.bio && <p className={styles.error}>Bio is required</p>}
                <button type="submit" className={styles.submitBtn}>Update Profile Settings</button>
              </form>
            )}

            {activeTab === 'Appearance' && (
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <select name="theme" ref={register({ required: true })} className={styles.select}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <select name="font" ref={register({ required: true })} className={styles.select}>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <button type="submit" className={styles.submitBtn}>Update Appearance Settings</button>
              </form>
            )}
          </div>
        
</main>
      </div>
    </div>
  );
};

export default SettingsPage;


