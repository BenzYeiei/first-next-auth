import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import account_interface from '../../interfaces/account_interface';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    fontLink: {
      fontFamily: 'Prompt',
      fontSize: '16px',
    }
  }),
);

type Props = {
  handleOpen_login_form: () => void,
  handleOpen__register_form: () => void,
  account?: account_interface,
}

export default function Navbar({ handleOpen_login_form, handleOpen__register_form, account }: Props) {
  const classes = useStyles();
  const router = useRouter();

  const Logout = async() => {
    await fetch("https://benzyeiei.herokuapp.com/api/register/logout");
    return router.reload();
  };

  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Link href="/">
            <a className={classes.fontLink}>BenzYeiei</a>
          </Link>

          <Link href="/tests/render/csr">
            <Button color="inherit" className={classes.fontLink}>
              <a>Test_CSR</a>
            </Button>
          </Link>

          <Link href="/tests/render/ssr">
            <Button color="inherit" className={classes.fontLink}>
              <a>Test_SSR</a>
            </Button>
          </Link>


          <Typography variant="h6" className={classes.title}></Typography>

          { !account?.user &&
            <>
              <Button color="inherit" className={classes.fontLink} onClick={handleOpen_login_form}>
                <a>ลงชื่อเข้าใช้</a>
              </Button>
              <Button color="inherit" className={classes.fontLink} onClick={handleOpen__register_form}>
                <a>สร้างบัญชี</a>
              </Button>
            </>
          }
          
          { account?.user && 
            <>
            <p className={classes.fontLink} style={{ marginRight: "20px" }}>{ account.username }</p>
            <Link href="/">
              <Button color="inherit" className={classes.fontLink} onClick={Logout}>
                ออกจากระบบ
              </Button>
            </Link>
            </>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}

