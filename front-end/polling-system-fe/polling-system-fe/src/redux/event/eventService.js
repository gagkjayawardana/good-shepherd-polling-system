import axios from 'axios';

export const createEventService = async (event) => {
  try {
    const responseData = await axios.post('http://localhost:8000/event/createEvent', event, {
      withCredentials: true
    });
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

export const getEventService = async () => {
  try {
    const response = await axios.get('http://localhost:8000/event', {
      withCredentials: true
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateEventService = async (resultStatus) => {
  try {
    const response = await axios.put('http://localhost:8000/event/status', resultStatus, {
      withCredentials: true
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEventService = async () => {
  try {
    const response = await axios.delete('http://localhost:8000/event', {
      withCredentials: true
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
