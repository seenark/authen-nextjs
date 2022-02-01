import { NextPage } from 'next';
import * as React from 'react';
import AuthForm from '../components/auth/auth-form';

interface IAuthProps {
}

const Auth: NextPage<IAuthProps> = (props) => {
  return <AuthForm />
};

export default Auth;
