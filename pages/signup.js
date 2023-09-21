import {useState} from "react"
import {useRouter} from "next/router"
import {useForm} from "react-hook-form"
import useAuth from "../hooks/useAuth"
import Link from "next/link"
import Head from "next/head"
import styles from "../styles/signup.module.css"
import InputLabel from "../components/InputLabel"
import InputHelper from "../components/InputHelper"
import {DEFAULT_ERROR} from "./login"

export default function Signup() {
  const router = useRouter()
  const {signup, postSignupLogin} = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(DEFAULT_ERROR)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()

  function onSubmit(data) {
    setLoading(true)
    const newUser = {
      ...data,
      type: "consumer"
    }

    signup(newUser)
      .then(res => {
        const userData = {
          email: newUser.email,
          password: newUser.password,
          _id: res.data.user._id,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName
        }

        const signupSuccess = res.data.success
        if (signupSuccess) {
          postSignupLogin(userData)
            .then(res => {
              const loginSuccess = res.data.success

              if (loginSuccess) {
                router.push("/")
              }
            })
            .finally(() => setLoading(false))
        }
      })
      .catch(error => {
        console.error(error)
        const signupError = error?.response?.data
        setError(signupError || error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <main className={styles.container}>
        <h1>Signup</h1>
        {error.code !== null && <p style={{color: "rgb(215,0,21)", fontWeight: "bold"}}>Error: {error.message}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={`${styles.fieldset} ${styles.horizontalFieldset}`}>
            <div className={styles.inputContainer}>
              <InputLabel id="firstName" text="First name" />
              <input
                {...register("firstName", {
                  required: true,
                  minLength: 3,
                  maxLength: 20
                })}
                id="firstName"
                className={styles.input}
                placeholder="Anna"
              />
              <InputHelper>
                {errors.firstName?.type === "required" && "First name is required"}
                {errors.firstName?.type === "minLength" && "First name must be longer than 3 characters"}
                {errors.firstName?.type === "maxLength" && "First name must be shorter than 20 characters"}
              </InputHelper>
            </div>
            <div className={styles.inputContainer}>
              <InputLabel id="lastName" text="Last name" />
              <input
                {...register("lastName", {
                  required: true,
                  minLength: 3,
                  maxLength: 20
                })}
                id="lastName"
                className={styles.input}
                placeholder="Jensen"
              />
              <InputHelper>
                {errors.lastName?.type === "required" && "Last name is required"}
                {errors.lastName?.type === "minLength" && "Last name must be longer than 3 characters"}
                {errors.lastName?.type === "maxLength" && "Last name must be shorter than 20 characters"}
              </InputHelper>
            </div>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <div className={styles.inputContainer}>
              <InputLabel id="email" text="Email" />
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                })}
                className={styles.input}
                placeholder="Email"
                id="email"
              />
              <InputHelper>{errors.email?.type === "required" && "Email is required"}</InputHelper>
            </div>
            <div className={styles.inputContainer}>
              <InputLabel id="password" text="Password" />
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20
                })}
                id="password"
                className={styles.input}
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
          <input className={styles.submit} type="submit" value="Signup" disabled={loading} />
        </form>
        <Link href="/login">
          <a className={styles.helperLink}>Already have an account? Login</a>
        </Link>
      </main>
    </>
  )
}
