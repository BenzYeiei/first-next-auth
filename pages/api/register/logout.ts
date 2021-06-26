// import withSession from '../../../libs/registers/session';

import { applySession } from "next-iron-session";
import { sessionOption, sessionOption_Interface } from '../../../libs/registers/session_option'


export default async function Logout (req: any, res: any) {
  try {

    const getSessionOption: sessionOption_Interface = sessionOption();

    await applySession(req, res, getSessionOption);
    req.session.destroy();
    res.json({ success: true });
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