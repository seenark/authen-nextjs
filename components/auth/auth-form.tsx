import classes from "./auth-form.module.css";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";

interface IAuthFormProps {}

async function createUser(email: string, password: string) {
  const body = {
    email,
    password,
  };
  try {
    const data = await axios.post("/api/auth/signup", body);
    return data;
  } catch (error) {
    return error
  }
}

const AuthForm: React.FunctionComponent<IAuthFormProps> = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  let emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current!.value
    const pass = passwordRef.current!.value
    if (isLogin) {
      const result:any = await signIn('credentials', {redirect: false, email, password:pass})

      if (!result.error) {
        router.replace("/profile")
      }

    } else {
      createUser(email, pass);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
