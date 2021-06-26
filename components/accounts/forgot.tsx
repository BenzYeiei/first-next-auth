import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';

import styles from '../../styles/accounts/login_form.module.css';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '35%',
      height: '230px',
    },
    frontButton: {
      fontFamily: "Prompt",
      fontSize: "18px",
    },
  }),
);

type Props = {
  display?: boolean,
  close?: () => void
};


function Forgot_form({ display, close }: Props) {
  const router = useRouter()

  // **** ตั้งค่า modal
  const classes = useStyles();
  const [open, setOpen] = useState(display);
  useEffect(() => {
    setOpen(display);
  }, [display]);

  // **** รับค่า
  // **** State
  const [email, setEmail] = useState(null);
  const [errorMS, setErrorMS] = useState(null);
  const [successMS, setSuccessMS] = useState(null);

  // **** รับค่า
  const onChange_data = (e: any) => {
    return setEmail(e.target.value);
  };

  // **** ล้างฟอร์มข้อมูล
  const clearForm = async() => {
    setTimeout(() => {
      setEmail(null);
      setSuccessMS(null)
      close();
    }, 20000)
  };

  // **** ส่งค่า
  const onClick_data = async () => {
    try {
      // **** fetch to backend for signIn
      const response = await fetch("https://benzyeiei-demo.herokuapp.com/api/account/forgot-pass", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: { "Content-Type": "application/json" }
      }
      );

      // ****ตรวจสอบ response
      if (response.status === 404) {
        return setErrorMS("email ไม่ถูกต้อง!!");
      };
      setErrorMS(null);
      setSuccessMS("ข้อความถูกส่งแล้วไปที่ email เรียบร้อยแล้ว.");
      return clearForm();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={close}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
                <div className={styles.first_paragraph}>
                  { errorMS && 
                    <Alert severity="error">{errorMS}</Alert>
                  }
                  { successMS && 
                  <Alert severity="success">{successMS}</Alert>
                  }
                  { !errorMS &&
                    <p></p>
                  }
                  <HighlightOffIcon fontSize="large" onClick={close}  />
                </div>
              <div className={styles.cardForm_login}>
                <div className={styles.itemForm_login}>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="email" style={{ fontSize: "20px" }}>อีเมลของบัญชี *</InputLabel>
                    <FilledInput
                      id="email"
                      name="email"
                      type="text"
                      defaultValue={email}
                      style={{ fontSize: "18px" }}
                      onChange={(e) => onChange_data(e)}
                    />
                  </FormControl>
                </div>
                <Button className={classes.frontButton} variant="contained" color="primary" onClick={onClick_data}>
                  ส่งอีเมล
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default Forgot_form
