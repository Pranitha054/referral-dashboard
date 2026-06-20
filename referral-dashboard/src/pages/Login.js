import {useState} from 'react'
import {
  useNavigate,
  Navigate,
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {loginUser} from '../services/authApi'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')
  const [errorMsg, setErrorMsg] =
    useState('')

  const navigate = useNavigate()

  const jwtToken =
    Cookies.get('jwt_token')

  if (jwtToken) {
    return <Navigate to="/" />
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response =
        await loginUser(
          email,
          password
        )

      if (response.ok) {
        Cookies.set(
          'jwt_token',
          response.data.data.token,
          {
            expires: 7,
          }
        )

        navigate('/')
      } else {
        setErrorMsg(
          response.data.message ||
            'Login Failed'
        )
      }
    } catch (error) {
      console.log(error)

      setErrorMsg(
        'Something went wrong'
      )
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-logo">
          Go Business
        </h1>

        <p className="login-description">
          Sign in to open your
          referral dashboard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div className="input-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={event =>
                setEmail(
                  event.target.value
                )
              }
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={event =>
                setPassword(
                  event.target.value
                )
              }
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

          {errorMsg && (
            <p className="error-message">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login