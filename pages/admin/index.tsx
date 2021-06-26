import React from 'react'
import {  GetServerSideProps } from 'next'
import { applySession } from "next-iron-session";
import PropTypes from 'prop-types'

import Admin_layout from '../../components/admin/admin.layout';
import { sessionOption, sessionOption_Interface } from '../../libs/registers/session_option';


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

  return { 
    props: {
      account: getAccount
    }
  };
};


function Admin_index({ account }) {
  
  const fetcher_1 = () => {
    const fetch_data = async() => {
      const response = await fetch("/api/register/signin",
        {
          method: "POST",
          headers: { "Content-Type": "applecation/json" },
          body: JSON.stringify({  })
        }
      );
      console.log(response);
    };
    fetch_data()
  };

  const fetcher_2 = () => {
    const fetch_data = async() => {
      const response = await fetch("https://benzyeiei-demo.herokuapp.com/api/account/signin-cookie",
        {
          method: "POST",
          headers: { "Content-Type": "applecation/json" },
          body: JSON.stringify({  })
        }
      );
      console.log(response);
    };
    fetch_data()
  };


  return (
    <Admin_layout title="Admin base" account={account}>
      <h1 style={{ marginLeft: -10 }}>Hellow World. หกาส่ดสาฟหกสวาด</h1>

      <h1 onClick={() => fetcher_1()}>fetch 1</h1>
      <h1 onClick={() => fetcher_2()}>fetch 2</h1>
    </Admin_layout>
  )
}



export default Admin_index;

Admin_index.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string,
    expiresIn: PropTypes.number,
  })
}