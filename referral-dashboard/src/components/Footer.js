import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <h2 className="footer-logo">
            Go Business
          </h2>

          <div className="footer-links">
            <a href="/">
              About
            </a>

            <a href="/">
              Privacy
            </a>

            <a href="/">
              Terms
            </a>

            <a href="/">
              Contact
            </a>
          </div>
        </div>

        <hr className="footer-line" />

        <p className="footer-copy">
          © 2024 Go Business. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer