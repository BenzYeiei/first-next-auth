import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next';
import { applySession } from "next-iron-session";

import Layout from '../../../components/systems/Layout';
import { sessionOption, sessionOption_Interface } from '../../../libs/registers/session_option';
import account_interface from '../../../interfaces/account_interface';

// export const getStaticProps: GetStaticProps = async() => {
//   return {
//     props: {

//     }
//   }
// }

const Csr = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchData = async() => {
      const get_response = await fetch("http://127.0.0.1:5000/api/account/listusername",{
        method: 'GET',
      });
      const get_data = await get_response.json();
      setData(get_data.data);

    };
    fetchData();
  }, []);
  
  return (
    <Layout title="CSR">
      <h1>Hello World.</h1>
      <h1 style={{ color:'red' }}>จะไม่เห็นข้อมูลใน network</h1>
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

export default Csr
