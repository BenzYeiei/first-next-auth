import { withIronSession } from 'next-iron-session'

export default function withSession(expiresIn: number, handler: (req: any, res: any) => void) {

  console.log(handler.call);
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'next.js/examples/with-iron-session-2',
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: expiresIn,
    },
  })
}