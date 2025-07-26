export const requestData = async (params: string = '1') => {
  try {
    const data = await fetch(`http://numbersapi.com/${params}`, {
      headers: {
        'Content-type': 'text/plain'
      }
    })
    return data.text();

  } catch (e) {
    console.error("Error with fetch operation", e)
  }
}