import axios from '../axios/axios';

export const absenceService = {
    getAllAbsence,
};


function getAllAbsence() {
    return axios.get('/absence/getAllAbsence').then(handleRegisterResponse)
      .then(absences => absences);
  }

function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log('handleRegisterResponse => error');
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}
