import axios from 'axios';

export const loginUserService = async (user) => {
  try {
    const responseData = await axios.post('http://localhost:8000/user/login', user, {
      withCredentials: true
    });
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

export const logoutUserService = async () => {
  try {
    const responseData = await axios.get('http://localhost:8000/user/logout', {
      withCredentials: true
    });
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

export const newAccessTokenService = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/user/refresh',
      {},
      {
        withCredentials: true
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getLogedUserService = async () => {
  try {
    const response = await axios.get('http://localhost:8000/user/getUser', {
      withCredentials: true
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
