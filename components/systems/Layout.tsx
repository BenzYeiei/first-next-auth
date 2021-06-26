import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/layout.module.css';
import Navbar from './navbar';
import Login_form from '../accounts/login_form';
import Forgot_form from '../accounts/forgot';
import Register_form from '../accounts/register_form';
import account_interface from '../../interfaces/account_interface';


type Props = {
  children?: ReactNode,
  title?: string,
  account?: account_interface | null | undefined,
};

export default function Layout( { children, title="BenZy Demo", account } : Props ){

  // **** setup for login form
  const [open_login_form, setOpen_login_form] = useState(false);
  const handleOpen_login_form = () => {
    setOpen_login_form(true);
  };
  const handleClose_login_form = () => {
    setOpen_login_form(false);
  };
  
    // **** setup for login form
    const [open_register_form, setOpen_register_form] = useState(false);
    const handleOpen__register_form = () => {
      setOpen_register_form(true);
    };
    const handleClose__register_form = () => {
      setOpen_register_form(false);
    };

  // **** setup for forgot form
  const [open_forgot_form, setOpen_forgot_form] = useState(false);
  const handleOpen_forgot_form = () => {
    setOpen_login_form(false);
    setOpen_forgot_form(true);
  };
  const handleClose_forgot_form = () => {
    setOpen_forgot_form(false);
  };


  return (
    <div className={styles.body}>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Navbar 
          handleOpen_login_form={handleOpen_login_form}
          handleOpen__register_form={handleOpen__register_form}
          account={account} 
        />
      </header>

      <Login_form 
        display={open_login_form} 
        close={handleClose_login_form} 
        handleOpen_forgot_form={handleOpen_forgot_form} 
      />

      <Register_form 
        open_register_form={open_register_form} 
        handleClose__register_form={handleClose__register_form} 
      />
      
      <Forgot_form 
        display={open_forgot_form}
        close={handleClose_forgot_form} 
      />

      {/**** body of pages  */}
      <div style={{ margin: "10px" }}>
        { children }
      </div>

      
    </div>
  )
}