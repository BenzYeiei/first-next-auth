import React from 'react';
import {  GetServerSideProps } from 'next'
import { applySession } from "next-iron-session";

import Layout from '../components/systems/Layout' ;
import { sessionOption, sessionOption_Interface } from '../libs/registers/session_option';
import account_interface from '../interfaces/account_interface';

export const getServerSideProps: GetServerSideProps = async ({ req, res }: { req:any, res: any }) => {
  // **** เรียนใช้งาน option ของ session
  const getSessionOption: sessionOption_Interface = sessionOption();
  // **** เพิ่ม session ลงไปที่ request
  await applySession(req, res, getSessionOption);
  // **** รับค่าจาก session
  const getAccount:account_interface = req.session.get('account');
  // **** ตรวจสอบข้อมูล
  if (getAccount === undefined) {
    return { 
      props: {
        account: null
      }
    };
  }

  return { 
    props: {
      account: getAccount
    }
  };
};


export default function Home({ account }) {

  

  return (
    <Layout title="BenzYeiei Demo" account={account}>
        ฟกด่เ้ฟย่้ดเย่าฟยกด้ยฟ่า้ย

    </Layout>
  )
}
