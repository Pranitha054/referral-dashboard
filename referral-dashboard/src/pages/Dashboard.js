import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getReferrals} from '../services/referralApi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  const [referrals, setReferrals] = useState([])
  const [metrics, setMetrics] = useState([])
  const [serviceSummary, setServiceSummary] = useState({})
  const [referralInfo, setReferralInfo] = useState({})

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('desc')
  const [currentPage, setCurrentPage] =
    useState(1)

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadReferrals()
}, [search, sort])
  const loadReferrals = async () => {
    try {
      const response =
        await getReferrals(
          search,
          sort
        )

      setMetrics(
        response.data.metrics || []
      )

      setServiceSummary(
        response.data.serviceSummary ||
          {}
      )

      setReferralInfo(
        response.data.referral || {}
      )

      setReferrals(
        response.data.referrals || []
      )
    } catch (error) {
      console.log(error)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(
      referralInfo.link
    )
    alert('Link copied')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(
      referralInfo.code
    )
    alert('Code copied')
  }

  const rowsPerPage = 10

  const startIndex =
    (currentPage - 1) * rowsPerPage

  const endIndex =
    startIndex + rowsPerPage

  const currentRows =
    referrals.slice(
      startIndex,
      endIndex
    )

  const totalPages = Math.ceil(
    referrals.length / rowsPerPage
  )

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Referral Dashboard</h1>

          <p>
            Track your referrals,
            earnings and partner
            activity in one place.
          </p>
        </div>

        <section className="section-card">
          <h2>Overview</h2>

          <div className="metrics-grid">
            {metrics.map(item => (
              <div
                key={item.id}
                className="metric-card"
              >
                <h3>{item.value}</h3>

                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <h2>Service Summary</h2>

          <div className="summary-grid">
            <div className="summary-card">
              <h4>SERVICE</h4>
              <p>
                {serviceSummary.service}
              </p>
            </div>

            <div className="summary-card">
              <h4>
                YOUR REFERRALS
              </h4>
              <p>
                {
                  serviceSummary.yourReferrals
                }
              </p>
            </div>

            <div className="summary-card">
              <h4>
                ACTIVE REFERRALS
              </h4>
              <p>
                {
                  serviceSummary.activeReferrals
                }
              </p>
            </div>

            <div className="summary-card">
              <h4>
                TOTAL REF.
                EARNINGS
              </h4>
              <p>
                {
                  serviceSummary.totalRefEarnings
                }
              </p>
            </div>
          </div>
        </section>

        <section className="section-card">
          <h2>
            Refer friends and earn
            more
          </h2>

          <div className="referral-grid">
            <div>
              <label>
                YOUR REFERRAL LINK
              </label>

              <div className="copy-box">
                <input
                  value={
                    referralInfo.link ||
                    ''
                  }
                  readOnly
                />

                <button
                  onClick={copyLink}
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label>
                YOUR REFERRAL CODE
              </label>

              <div className="copy-box">
                <input
                  value={
                    referralInfo.code ||
                    ''
                  }
                  readOnly
                />

                <button
                  onClick={copyCode}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="table-top">
            <h2>All Referrals</h2>

            <div>
              <input
                type="text"
                placeholder="Name or service..."
                value={search}
                onChange={e => {
                  setSearch(
                    e.target.value
                  )
                  setCurrentPage(1)
                }}
              />

              <select
                value={sort}
                onChange={e =>
                  setSort(
                    e.target.value
                  )
                }
              >
                <option value="desc">
                  Newest first
                </option>

                <option value="asc">
                  Oldest first
                </option>
              </select>
            </div>
          </div>

          <table className="referral-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map(
                item => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/referral/${item.id}`
                      )
                    }
                  >
                    <td>
                      {item.name}
                    </td>

                    <td>
                      {
                        item.serviceName
                      }
                    </td>

                    <td>
                      {item.date.replaceAll(
                        '-',
                        '/'
                      )}
                    </td>

                    <td className="profit">
                      {new Intl.NumberFormat(
                        'en-US',
                        {
                          style:
                            'currency',
                          currency:
                            'USD',
                          maximumFractionDigits: 0,
                        }
                      ).format(
                        item.profit
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(
        prev => prev - 1
      )
    }
  >
    Previous
  </button>

  {Array.from(
    {length: totalPages},
    (_, index) => (
      <button
        key={index + 1}
        className={
          currentPage === index + 1
            ? 'current-page'
            : 'page-number'
        }
        onClick={() =>
          setCurrentPage(index + 1)
        }
      >
        {index + 1}
      </button>
    )
  )}

  <button
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage(
        prev => prev + 1
      )
    }
  >
    Next
  </button>
</div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Dashboard