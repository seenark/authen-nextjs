import ProfileForm from "./profile-form";
import { getSession } from 'next-auth/react'
import classes from "./user-profile.module.css";
import { useEffect, useState } from "react";
import { Session } from "next-auth";



interface IUserProfileProps {}

const UserProfile: React.FunctionComponent<IUserProfileProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadedSession, setLoadedSession] = useState<Session | null>()

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        window.location.href = "/auth"
      }
      setLoadedSession(session)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
