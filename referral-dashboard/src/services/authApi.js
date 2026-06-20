export const loginUser = async (email, password) => {
  const response = await fetch(
    'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )

  const data = await response.json()

  return {
    ok: response.ok,
    data,
  }
}