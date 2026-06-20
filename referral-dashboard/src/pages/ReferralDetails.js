import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {getReferralById} from '../services/referralApi'
import '../styles/ReferralDetails.css'

function ReferralDetails() {
  const {id} = useParams()

  const [referral, setReferral] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadReferral()
}, [])

  const loadReferral = async () => {
    try {
      const response =
        await getReferralById(id)

      const referralData =
        response.data.referrals[0]

      setReferral(referralData)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <h1 className="loading">
        Loading...
      </h1>
    )
  }

  if (!referral) {
    return (
      <div>
        <Header />

        <div className="details-container">
          <h1>
            Referral not found
          </h1>

          <Link to="/">
            Back to Dashboard
          </Link>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className="details-container">
        <div className="details-card">
          <div className="details-top">
            <h1>
              Referral Details
            </h1>

            <Link
              to="/"
              className="back-btn"
            >
              ← Dashboard
            </Link>
          </div>

          <div className="details-grid">
            <div>
              <label>
                Referral ID
              </label>

              <p>
                {referral.id}
              </p>
            </div>

            <div>
              <label>
                Name
              </label>

              <p>
                {referral.name}
              </p>
            </div>

            <div>
              <label>
                Service
              </label>

              <p className="service-badge">
                {
                  referral.serviceName
                }
              </p>
            </div>

            <div>
              <label>
                Date
              </label>

              <p>
                {referral.date.replaceAll(
                  '-',
                  '/'
                )}
              </p>
            </div>

            <div>
              <label>
                Profit
              </label>

              <p className="profit-value">
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
                  referral.profit
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ReferralDetails