// import withSession from '../../../libs/registers/session';

import { applySession } from "next-iron-session";
import { sessionOption, sessionOption_Interface } from '../../../libs/registers/session_option'


export default async function Login (req: any, res: any) {
  try {
    
    const { email, username, admin, author, user, token, expire } = await req.body;

    const account = { email, username, admin, author, user, token, expire }

    const getSessionOption: sessionOption_Interface = sessionOption(expire);

    await applySession(req, res, getSessionOption);
    
    req.session.set('account', account)
    await req.session.save()

    res.json(account)
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
};


// export default withSession(60 * 2, async (req, res) => {
//   try {
//     const { email, username, token, expiresIn } = await req.body;

//     const account = { isLoggedIn: true, email, username, token, expiresIn }
    
//     // req.session.set('account', account)
//     // await req.session.save()
//     res.json(account)
//     return 123
//   } catch (error) {
//     const { response: fetchResponse } = error
//     res.status(fetchResponse?.status || 500).json(error.data)
//   }
// });