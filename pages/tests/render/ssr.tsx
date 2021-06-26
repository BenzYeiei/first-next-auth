import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { applySession } from "next-iron-session";

import Layout from '../../../components/systems/Layout';
import { sessionOption, sessionOption_Interface } from '../../../libs/registers/session_option';
import account_interface from '../../../interfaces/account_interface';


type Props = {
  list_username: [{ username :string }],
  account: account_interface,
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: { req: any, res: any }) => {
  const get_response = await fetch("http://127.0.0.1:5000/api/account/listusername",{
    method: 'GET',
  });
  const data = await get_response.json();

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
        list_username: data.data,
        account: null
      }
    };
  }

  return {
    props: {
      list_username: data.data,
      account: getAccount,
    },
  }
}

const Ssr = ({ list_username, account }: Props) => {
  const [data] = useState(list_username);
   
  return (
    <Layout title="SSR" account={account}>
      <h1>Hello World.</h1>
      <h1 style={{ color:'red' }}>จะเห็นข้อมูลใน network</h1>
      { data && data.map((value, index) => {
          return(
            <h3 key={`${index}`}>
              { value.username }
            </h3>
          )
        })
      }
    </Layout>
  )
}
export default Ssr