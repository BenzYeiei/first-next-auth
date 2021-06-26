import { useState } from 'react';
import { GetStaticProps } from 'next'

import Layout from '../../components/systems/Layout';

type Props = {
  name : string
};

export default function About( { name } :Props ) {
  const [abc, setAbc] = useState("Default non.");
  const abc_Change = (e) => {
    setAbc(e.target.value);
  };

  return(
    <Layout title="Home of Test">
      <h1>{ name }</h1>
      <h1>{ abc }</h1>
      <input onChange={e => abc_Change(e)} />
    </Layout>
  )
}


export const getStaticProps : GetStaticProps = async(context) => {
  const name = "BenzYeiei"
  return { 
    props : {
      name : name
    }
  };
};