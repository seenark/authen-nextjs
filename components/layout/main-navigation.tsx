import Link from "next/link";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

interface IMainNavigationProps {}

const MainNavigation: React.FunctionComponent<IMainNavigationProps> = (
  props
) => {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      console.log("no login");
    },
  });

  console.log("🚀 ~ file: main-navigation.tsx ~ line 11 ~ data", data);
  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!data && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {data && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {data && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
