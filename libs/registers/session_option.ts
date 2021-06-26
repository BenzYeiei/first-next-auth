export function sessionOption (getExpire?: number | null) {
  const expire: number = getExpire || undefined;
  return {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'account-Session',
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: expire,
    }
  }
}

export interface sessionOption_Interface {
  password: string;
  cookieName: string;
  cookieOptions: {
      httpOnly: boolean;
      // **** sameSite มีค่า 2 type เป็น boolean และ string ดังนี้ boolean | "lax" | "strict" | "none"
      sameSite: any;
      secure: boolean;
      maxAge: any;
  };
}