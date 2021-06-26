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
import { GreenButton } from '../button/button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '35%',
    },
    frontButton: {
      fontFamily: "Prompt",
      fontSize: "18px",
      marginRight: "20px",
    },
  }),
);

type Props = {
  display: boolean,
  close: () => void,
  handleOpen_forgot_form: () => void,
};

interface State {
  amount: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}


function Login_form({ display, close, handleOpen_forgot_form }: Props) {
  const router = useRouter()

  // **** ตั้งค่า modal
  const classes = useStyles();
  const [open, setOpen] = useState(display);
  useEffect(() => {
    setOpen(display);
  }, [display]);

  // **** ปุ่มแสดง password
  const [values, setValues] = useState<State>({
    amount: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  // **** รับค่า
  // **** State
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMS, setErrorMS] = useState(null);

  // **** รับค่า
  const onChange_data = (e: any) => {
    if (e.target.name === "username") {
      return setUsername(e.target.value);
    }
    return setPassword(e.target.value);
  };

  // **** ส่งค่า
  const onClick_data = async () => {
    try {
      // **** fetch to backend for signIn
      const response = await fetch("http://127.0.0.1:5000/api/account/login", {
        method: "POST",
        body: JSON.stringify({
          emailORusername: username,
          password: password
        }),
        headers: { "Content-Type": "application/json" }
      });

      // ****ตรวจสอบ response
      if (response.status === 404) {
        return setErrorMS("username หรือ email ไม่ถูกต้อง!!");
      };

      // ****ตรวจสอบ response
      if (response.status === 403) {
        return setErrorMS("รหัสผ่าน ไม่ถูกต้อง!!");
      };
      setErrorMS(null);

      // **** get data from response
      const data = await response.json();
      // console.log(data);

      // **** fetch for set cookie
      await fetch("http://localhost:3000/api/register/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          admin: data.admin,
          author: data.author,
          user: data.user,
          token: data.token,
          expire: data.expire,
        }),
        headers: { "Content-Type": "application/json" }
      });

      // **** เปลี่ยนหน้าไป admin
      if (data.admin) {
        return router.push('/admin');
      }

      // **** เปลี่ยนหน้าไป home
      if (data.user) {
        return router.reload();
      }

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
                  { !errorMS &&
                    <p></p>
                  }
                  <HighlightOffIcon fontSize="large" onClick={close}  />
                </div>
              <div className={styles.cardForm_login}>
                <div className={styles.itemForm_login}>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="username" style={{ fontSize: "20px" }}>ชื่อผู้ใช้งาน หรือ อีเมล *</InputLabel>
                    <FilledInput
                      id="username"
                      name="username"
                      type="text"
                      defaultValue={username}
                      style={{ fontSize: "18px" }}
                      onChange={(e) => onChange_data(e)}
                    />
                  </FormControl>
                </div>
                <div className={styles.itemForm_login}>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="password" style={{ fontSize: "20px" }}>รหัสผ่าน *</InputLabel>
                    <FilledInput
                      id="password"
                      name="password"
                      type={values.showPassword ? 'text' : 'password'}
                      defaultValue={password}
                      inputProps={{ style: { fontSize: 18 } }}
                      onChange={(e) => onChange_data(e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className={styles.div_button}>
                  <Button className={classes.frontButton} variant="contained" color="primary" onClick={onClick_data}>
                    ลงชื่อเข้าใช้
                  </Button>
                  <GreenButton className={classes.frontButton} variant="contained" color="primary" onClick={handleOpen_forgot_form}>
                    ลืมรหัสผ่าน
                  </GreenButton>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default Login_form
