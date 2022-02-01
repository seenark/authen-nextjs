import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import UserProfile from '../components/profile/user-profile';

interface IProfileProps {
}

const Profile: NextPage<IProfileProps> = (props) => {
  return (
    <UserProfile />
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({req: context.req})
  if (!session) {
    return {
      redirect: "/auth",
      props: {}
    }
  }

  return {
    props: {}
  }
}

export default Profile;
