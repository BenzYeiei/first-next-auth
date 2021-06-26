import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Admin_navbar from './navbar';
import styles from '../../styles/admin/admin.module.css';
import account_interface from '../../interfaces/account_interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 240,
    },
  }),
);

type Props = {
  account?: account_interface,
  title?: string,
  children?: ReactNode
};

export default function Admin_layout( { children, title="BenZy Demo", account } : Props ){
  const classes = useStyles();

  const [open_drawer, setOpen_drawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpen_drawer(true);
  };
  const handleDrawerClose = () => {
    setOpen_drawer(false);
  };

  const [open_login_form, setOpen_login_form] = useState(false);
  const handleOpen_login_form = () => {
    setOpen_login_form(true);
  };
  const handleClose_login_form = () => {
    setOpen_login_form(false);
  };
  
  return (
    <div className={styles.body}>
    {/* <div > */}
      <Head>
        <title>{title}</title>
      </Head>
      <Admin_navbar 
        account={account}
        open_drawer={open_drawer} 
        handleDrawerOpen={handleDrawerOpen} 
        handleDrawerClose={handleDrawerClose}
      />

      {/**** body of pages  */}
      <div className={
        `${clsx(classes.content, {[classes.contentShift]: open_drawer})}
         
        `
      }>
        <div className={classes.drawerHeader} />
        { children }
      </div>
    </div>
  )
}