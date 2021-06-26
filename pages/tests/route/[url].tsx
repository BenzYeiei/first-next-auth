import { useRouter } from 'next/router'
import React, { useState } from 'react';

import Layout from '../../../components/systems/Layout';

type Props = {

};

export default function TestRouteAPI({} : Props) {
  const router = useRouter();
  const url = router.query.url;
  const [param] = useState(url);

  console.log(param, url);

  return (
    <Layout title="test Routs">
      <h1>{ url } Hello World. { param }</h1>
    </Layout>
  )
}