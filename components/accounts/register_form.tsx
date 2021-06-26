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
import { Collapse } from '@material-ui/core';


type Props = {
  open_register_form?: boolean,
  handleClose__register_form?: () => void,
};

interface State {
  amount: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

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
      // height: '470px',
    },
    frontButton: {
      fontFamily: "Prompt",
      fontSize: "18px",
      marginRight: "20px",
    },
  }),
);

interface registerData {
  email: string,
  username: string,
  password: string,
  password_2: string
}


function Register_form({ open_register_form, handleClose__register_form }: Props) {
  const router = useRouter()

  // **** ตั้งค่า modal
  const classes = useStyles();
  const [open, setOpen] = useState(open_register_form);
  useEffect(() => {
    setOpen(open_register_form);
  }, [open_register_form]);

  // **** ปุ่มแสดง password
  const [values, setValues] = useState<State>({
    amount: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = (e) => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  // **** Register State
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    usernameErr: false,
    responseErr: null
  });

  // **** รับค่า Register
  const handle_onChange_data = (event: any) => {
    return setRegisterData({...registerData, [event.target.name]: event.target.value});
  };

  // **** รับค่า username
  const handle_onChange_username = (event: any, cb?: (getRegisterData?:registerData) => void) => {
    // **** รับค่า username
    const getRegisterData = {...registerData, [event.target.name]: event.target.value};
    // **** เพิ่มค่า username ลง RegisterData
    setRegisterData(getRegisterData);
    // **** ตรวจสอบตัวอักษร
    const pattern = /[^A-Z^a-z^0-9^ก-์^_]/g;
    if (pattern.test(getRegisterData.username)) {
      return setMessage({...message, usernameErr: true});
    };
    return setMessage({...message, usernameErr: false});
  };

  const clearForm = () => {
    setRegisterData({
      email: "",
      username: "",
      password: "",
    });
    setMessage({
      usernameErr: false,
      responseErr: null
    });
    handleClose__register_form();
  };

  const handleSendData = async() => {
    try {
      const response_register = await fetch("http://127.0.0.1:5000/api/account/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 
          email: registerData.email, 
          username: registerData.username, 
          password: registerData.password
        })
      });
  
      // **** get data from response
      const data_register = await response_register.json();

      // **** ตรวจสอบ error
      if (data_register.hasOwnProperty('errors')){
        // **** ตรวจสอบค่าที่ว่าง
        if (data_register.errors.hasOwnProperty('errors')) {
          // **** ตรวจสอบค่าที่ว่าง ของ email
          if (data_register.errors.errors.hasOwnProperty('email')) {
            return setMessage({...message, responseErr: "กรุณาใส่ข้อมูลอีเมล!!"});
          }
          // **** ตรวจสอบค่าที่ว่าง ของ username
          if (data_register.errors.errors.hasOwnProperty('username')) {
            return setMessage({...message, responseErr: "กรุณาใส่ข้อมูลชื่อผู้ใช้งาน!!"});
          }
          // **** ตรวจสอบค่าที่ว่าง ของ password
          return setMessage({...message, responseErr: "กรุณาใส่ข้อมูลรหัส!!"});
        }

        // **** ตรวจสอบค่าที่ซ้ำกัน
        if (data_register.errors.hasOwnProperty('keyPattern')) {
          // **** ตรวจสอบค่าที่ซ้ำกัน ของ email
          if (data_register.errors.keyPattern.hasOwnProperty('email')) {
            return setMessage({...message, responseErr: "อีเมลถูกใช้งานแล้ว!!"});
          }
          // **** ตรวจสอบค่าที่ซ้ำกัน ของ username
          setMessage({...message, responseErr: "ชื่อผู้ใช้งานถูกใช้งานแล้ว!!"})
        }
      }

      const response_login = await fetch("http://127.0.0.1:5000/api/account/login", {
        method: "POST",
        body: JSON.stringify({
          emailORusername: data_register.email,
          password: data_register.password
        }),
        headers: { "Content-Type": "application/json" }
      });

      // ****ตรวจสอบ response
      if (response_login.status === 404) {
        return setMessage({...message, responseErr: "username หรือ email ไม่ถูกต้อง!!"});
      };

      // ****ตรวจสอบ response
      if (response_login.status === 403) {
        return setMessage({...message, responseErr: "รหัสผ่าน ไม่ถูกต้อง!!"});
      };

      // **** get data from response
      const data_login = await response_login.json();

      // **** fetch for set cookie
      await fetch("http://localhost:3000/api/register/login", {
        method: "POST",
        body: JSON.stringify({
          email: data_login.email,
          username: data_login.username,
          admin: data_login.admin,
          author: data_login.author,
          user: data_login.user,
          token: data_login.token,
          expire: data_login.expire,
        }),
        headers: { "Content-Type": "application/json" }
      });
      
      // **** เปลี่ยนหน้าไป admin
      if (data_login.admin) {
        return router.push('/admin');
      }

      // **** เปลี่ยนหน้าไป home
      if (data_login.user) {
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
          onClose={handleClose__register_form}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={styles.first_paragraph}>
                { message.responseErr &&
                  <Alert severity="error">{message.responseErr}</Alert>
                }
                { !message.responseErr &&
                  <p></p>
                }
                <HighlightOffIcon fontSize="large" onClick={handleClose__register_form}  />
              </div>
              <div className={styles.cardForm_login}>
                {/**** email */}
                <div className={styles.itemForm_login}>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="email" style={{ fontSize: "20px" }}>อีเมล *</InputLabel>
                    <FilledInput
                      id="email"
                      name="email"
                      type="text"
                      defaultValue={registerData.email}
                      style={{ fontSize: "18px" }}
                      onChange={(e) => handle_onChange_data(e)}
                    />
                  </FormControl>
                </div>
                { message.usernameErr && 
                  <Alert severity="error">ตรวจสอบตัวอักษรของ ชื่อผู้ใช้งาน อีกครั้ง. ห้ามใช้ตัวอักษรพิเศษ</Alert>
                }
                {/**** username */}
                <div className={styles.itemForm_login}>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="username" style={{ fontSize: "20px" }}>ชื่อผู้ใช้งาน *</InputLabel>
                    <FilledInput
                      id="username"
                      name="username"
                      type="text"
                      defaultValue={registerData.username}
                      style={{ fontSize: "18px" }}
                      onChange={(e) => handle_onChange_username(e)}
                    />
                  </FormControl>
                </div>
                {/**** password */}
                <div className={styles.itemForm_login}>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="password" style={{ fontSize: "20px" }}>รหัสผ่าน *</InputLabel>
                    <FilledInput
                      id="password"
                      name="password"
                      type={values.showPassword ? 'text' : 'password'}
                      defaultValue={registerData.password}
                      inputProps={{ style: { fontSize: 18 } }}
                      onChange={(e) => handle_onChange_data(e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => handleClickShowPassword(e)}
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
                  <Button className={classes.frontButton} variant="contained" color="primary" onClick={handleSendData}>
                    สร้างบัญชี
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default Register_form
