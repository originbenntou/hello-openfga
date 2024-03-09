import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import {NextResponse} from "next/server";
import jwt from 'jsonwebtoken';

const afterCallback = async (req, session) => {
  const decodedToken = jwt.decode(session.idToken);
  console.log(decodedToken);
  return session;
};

export const GET = handleAuth({
  callback: async (req, ctx) => {
    try {
      return (await handleCallback(req, ctx, { afterCallback }));
    } catch (error) {
      return NextResponse.redirect('/auth/error');
    }
  }
});
