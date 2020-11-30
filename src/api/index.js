const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api";

export async function fetchAPI(url, method = "GET", sendData = null) {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAzLCJ1c2VybmFtZSI6ImV2b25zYW5kZXJzIiwiaWF0IjoxNjA2MTgyNzM2LCJleHAiOjE2MDY3ODc1MzZ9.ZRFmbahrnLeJhfc8s-OtsAve2r41MlkReZyJcLtvUCo",
    },
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
}

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

const setToken = (token) => {
  localStorage.setItem("auth-token", token);
};
function buildHeaders() {
    let base = {
      'Content-Type': 'application/json',
    }
    if (getToken()) {
      base['Authorization'] = `Bearer ${getToken()}`
    }
    return base
  }



export const auth = async (username, password, isNew = false) => {
    const url = `${BASE_URL}/users` + (isNew ? '/register' : '/login')
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    const { error, user, token } = await response.json()
    if (error) {
      throw Error(error.message)
    }
    if (token) {
      setToken(token)
    }
    //return data
  }
  export const hitAPI = async (method, endpoint, bodyObj) => {
    const payload = {
      method: method,
      headers: buildHeaders(),
    }
    if (bodyObj) {
      payload.body = JSON.stringify(bodyObj)
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, payload)
    const data = await response.json()
    return data
  }

