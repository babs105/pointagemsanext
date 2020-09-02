import axios from '../axios/axios';

export const sortieService = {
 createSortie,
 getAllDepointage,
 getAllDepointageToday,
 deleteSortieById,
 getDepointageById,
 createOrUpdateSortie
  
};
function createOrUpdateSortie(sortie) {
  return axios.post('/depointage/create', sortie).then(handleRegisterResponse)
    .then(sortie => sortie);
}

function createSortie(sortie) {
  return axios.post('/depointage/depointer', sortie).then(handleRegisterResponse)
    .then(sortie => sortie);
}
function getAllDepointage() {
    return axios.get('/depointage/getAllDepointage').then(handleRegisterResponse)
      .then(depointages => depointages);
  }
  function getAllDepointageToday() {
    return axios.get('/depointage/getAllDepointageToday').then(handleRegisterResponse)
      .then(depointages => depointages);
  }
  function deleteSortieById(id) {
    return axios.delete('/depointage/delete/'+id).then(handleRegisterResponse)
      .then(sortie => sortie);
  }
  function getDepointageById(id) {
    return axios.get('/depointage/getDepointageById/'+id).then(handleRegisterResponse)
      .then(depointage => depointage);
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
