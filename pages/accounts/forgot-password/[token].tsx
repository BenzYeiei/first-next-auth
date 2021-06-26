import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error';
import fetch from "node-fetch";

import Alert from '@material-ui/lab/Alert';

import Layout from '../../../components/systems/Layout';


export const getServerSideProps:GetServerSideProps = async () => {
  return {
    props: {},
  }
}


export default function Forgot_password()  {
  const router = useRouter();
  const [param] = useState(router.query.token);
  const [verifyToken, setverifyToken] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [successMS, setSuccessMS] = useState(null);
  const [errorMS, setErrorMS] = useState(null);

  // **** password form
  const [passwordData, setPasswordData] = useState(null);
  const [checkPassword, setCheckPassword] = useState(false);
  const [passwordDisplay_1, setPasswordDisplay_1] = useState("password");
  const [passwordDisplay_2, setPasswordDisplay_2] = useState("password");

  useEffect(() => {
    const executed = async(body) => {
      console.log(body)
      const response = await fetch("http://127.0.0.1:5000/api/account/verify-token", { 
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setverifyToken(true);
      setAccountData(data.data);
    };
    const body = { token: param };
    executed(body);
  }, [param]);


  // **** set pass to variable
  const inputPass = (e) => {
    setPasswordData(e.target.value);
  }

  // **** ตรวจสอบความถูกต้องของรหัสผ่านจาก 2 input
  const Check_input_password = (e) => {
    if (e.target.value !== passwordData) {
      return setCheckPassword(true)
    }
    return setCheckPassword(false);
  }


  // **** checkbox change for show password in input
  const checkboxPass = (num) => {
    if (num===1){
      if (passwordDisplay_1==="password") {
        return setPasswordDisplay_1("text");
      }
      return setPasswordDisplay_1("password");
    }
    if (passwordDisplay_2==="password") {
      return setPasswordDisplay_2("text");
    }
    return setPasswordDisplay_2("password");
  }


  // **** send password for reset password
  const send_data = async() => {
    const response = await fetch("http://127.0.0.1:5000/api/account/rest-password", { 
      method: 'POST',
      body: JSON.stringify({ password: passwordData, token: param }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) {
      return setErrorMS("หมดเวลาสำหรับเปลี่ยนรหัสผ่าน กรุณาส่งอีเมลอีครั้ง.");
    }

    if (response.status === 500) {
      return setErrorMS("ระบบมีปัญหาในการเปลี่ยนรหัสผ่าน.");
    }

    setErrorMS(null);
    setSuccessMS("รหัสผ่านถูกเปลี่ยนเรียบร้อย.");
     
    setTimeout(() => {
      router.push('/')
    }, 5000);
    
  };

  const RenderFN = () => {
    if(!verifyToken)
    return(
      <DefaultErrorPage statusCode={404} />
    )
    return(
      <>
        <Head>
          <title>BenzYiei Demo</title>
        </Head>
        { accountData &&
          <>
            <h1>คุณมีเวลา 15 นาทีในการสร้างรหัสผ่านใหม่. หลังจากคุณใส่อีเมล.</h1>
            <h4>สวัสดีคุณ: { accountData.username }</h4>

            <div>
              <div>
                { successMS &&
                  <Alert severity="success">{successMS}</Alert>
                }
                { errorMS &&
                  <Alert severity="error">{errorMS}</Alert>
                }
                
              </div>

              <div>
                <label>
                  ใส่รหัสผ่านใหม่: 
                  <input type={ passwordDisplay_1 } onChange={e => inputPass(e)} />
                </label>
                <label>
                  แสดงรหัสผ่าน
                  <input type="checkbox" onChange={() => checkboxPass(1)} />
                </label>
              </div>
              
              <div>
                <label>
                  ใส่รหัสผ่านใหม่ อีกครัง: 
                  <input type={ passwordDisplay_2 } onChange={e => Check_input_password(e)} />
                </label>
                <label>
                  แสดงรหัสผ่าน
                  <input type="checkbox" onChange={() => checkboxPass(2)} />
                </label>
                { checkPassword &&
                  <>
                  รหัสผ่านไม่ตรงกัน
                  </>
                }
              </div>
              <br />
              <button onClick={send_data}>ส่งข้อมูล</button>
            </div>
          </>
        }
      </>
    )
  }

  return (
    <>
      { RenderFN() }
    </>
  )
};
