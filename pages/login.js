import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import useAuth from "../hooks/useAuth"
import styles from "../styles/login.module.css"
import InputLabel from "../components/InputLabel"
import InputHelper from "../components/InputHelper"

export const DEFAULT_ERROR = {
  code: null,
  message: null
}

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState(DEFAULT_ERROR)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    setError(DEFAULT_ERROR)
    setLoading(true)

    login(data)
      .then(res => {
        const loginSuccess = res.data.success

        if (loginSuccess) {
          router.push("/")
        }
      })
      .catch(error => {
        const WEB_SERVER_IS_DOWN = 521
        const code = error.response?.status ?? WEB_SERVER_IS_DOWN
        let message = "The user doesn't exist"

        if (code === WEB_SERVER_IS_DOWN) {
          message = "The server is currently unresponsive"
        }

        setError({
          code,
          message
        })
      })
      .finally(() => setLoading(false))
  }

  return <>
    <Head>
      <title>Login</title>
    </Head>
    <main className={styles.container}>
      <h1>Login</h1>
      {error.code !== null && <p style={{ color: "rgb(215,0,21)", fontWeight: "bold" }}>Error: {error.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
          <div className={styles.inputContainer}>
            <InputLabel id="email" text="Email" />
            <input
              id="email"
              className={styles.input}
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
              })}
              type="email"
              placeholder="Email"
            />
            <InputHelper>{errors.email?.type === "required" && "Email is required"}</InputHelper>
          </div>
          <div className={styles.inputContainer}>
            <InputLabel id="password" text="Password" />
            <input
              id="password"
              className={styles.input}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20
              })}
              type="password"
              placeholder="Password"
            />
            <InputHelper>
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" && "Password must be longer than 6 characters"}
              {errors.password?.type === "maxLength" && "Password must be shorter than 20 characters"}
            </InputHelper>
          </div>
        </fieldset>
        <input className={styles.submit} type="submit" value="Login" disabled={loading} />
      </form>
      <Link href="/signup" className={styles.helperLink}>
        Do not have an account yet? Signup
      </Link>
    </main>
  </>;
}
