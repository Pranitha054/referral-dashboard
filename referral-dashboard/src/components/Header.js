import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import '../styles/Header.css'

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link
          to="/"
          className="logo"
        >
          Go Business
        </Link>

        <div className="header-actions">
          <button className="try-button">
            Try for free
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header