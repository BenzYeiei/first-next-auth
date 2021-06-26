import React from 'react'
import {  GetServerSideProps } from 'next'
import { applySession } from "next-iron-session";

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import Admin_layout from '../../components/admin/admin.layout';
import { sessionOption, sessionOption_Interface } from '../../libs/registers/session_option';
import style from '../../styles/admin/list_account.module.css';

export const getServerSideProps: GetServerSideProps = async ({ req, res }: { req:any, res: any }) => {
  const getSessionOption: sessionOption_Interface = sessionOption();
  await applySession(req, res, getSessionOption);
  const getAccount = req.session.get('account')
  if (getAccount === undefined) {
    return{ 
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const response = await fetch('https://benzyeiei-demo.herokuapp.com/api/account/listusername', {
    method: "GET",
    headers: { "Content-Type" : "application/json" }
  });
  const account_data = await response.json()
  if (!account_data) {
    return { 
      props: {
        account: getAccount,
        list_account: null,
      }
    };
  }

  return { 
    props: {
      account: getAccount,
      list_account: account_data.data,
    }
  };
};


function List_account({ account, list_account }) {
  const [getListAccount, setGetListAccount] = React.useState(list_account);
  const [destroyMS, setDestroyMS] = React.useState({ display: "", message: "" });

  const Destroy_Account = async(username) => {
    const response = await fetch(
      "https://benzyeiei-demo.herokuapp.com/api/admin/destroy-account", 
      {
        method: "POST",
        headers: { 
          "Content-Type" : "application/json",  
          "Authorization" : account.token
        },
        body: JSON.stringify({ username: username })
    });
    
    const data_response = await response.json();
    if (!data_response.success) {
      return setDestroyMS({ display: "error", message: "เกิดข้อผิดพลาด. กรุณาลองใหม่." });
    };


    const get_List_Account = await fetch('https://benzyeiei-demo.herokuapp.com/api/account/listusername', {
      method: "GET",
      headers: { "Content-Type" : "application/json" }
    })
    const dataRes = await get_List_Account.json();
    setGetListAccount(dataRes.data);
    setDestroyMS({ display: "success", message: `ลบบัญชีชื่อ ${data_response.username} ผู้ใช้เรียบร้อย.` });
  };
  

  return (
    <Admin_layout title="List Account" account={account}>
      { destroyMS.display === "success" && 
        <Alert severity="success">{ destroyMS.message }</Alert>
      }
      { destroyMS.display === "error" && 
        <Alert severity="error">{ destroyMS.message }</Alert>
      }
      { getListAccount && getListAccount.map((value, index) => {
        return (
          <div key={`${index}`} className={style.list_2}>
            <div className={style.list_content}>
              <h4>
                username: { value.username }
              </h4>
            </div>

            <div className={style.list_button}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => Destroy_Account(value.username)} 
                
              >
                delete
              </Button>
            </div>

          </div>

      )})}
    </Admin_layout>
  )
}

export default List_account
