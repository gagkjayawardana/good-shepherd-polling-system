import axios from 'axios';

export const addVoteService = async (vote) => {
  try {
    const response = await axios.post('http://localhost:8000/vote', vote, {
      withCredentials: true
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getVoteService = async () => {
  try {
    const response = await axios.get('http://localhost:8000/vote', { withCredentials: true });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
