import {useRouter} from "next/router"
import {useForm} from "react-hook-form"
import useAuth from "../hooks/useAuth"
import {useState} from "react"
import Link from "next/link"
import Head from "next/head"
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

  const {login} = useAuth()
  const {
    register,
    handleSubmit,
    formState: {errors}
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
        console.error(error)
        const newError = {
          code: error.response.status,
          message: "The user doesn't exist"
        }

        setError(newError)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.container}>
        <h1>Login</h1>
        {error.code !== null && <p style={{color: "rgb(215,0,21)", fontWeight: "bold"}}>Error: {error.message}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset}>
            <div className={styles.inputContainer}>
              <InputLabel id="email" text="Email" />
              <input
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
        <Link href="/signup">
          <a className={styles.helperLink}>Do not have an account yet? Signup</a>
        </Link>
      </main>
    </>
  )
}
