import Cookies from 'js-cookie'

const API_URL =
  'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals'

export const getReferrals = async (
  search = '',
  sort = 'desc'
) => {
  const jwtToken = Cookies.get('jwt_token')

  const response = await fetch(
    `${API_URL}?search=${search}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  )

  return response.json()
}

export const getReferralById = async id => {
  const jwtToken = Cookies.get('jwt_token')

  const response = await fetch(
    `${API_URL}?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  )

  return response.json()
}