import axios from "../axios/axios";

export const entreeService = {
  createEntree,
  getAllPointage,
  getAllPointageToday,
  getAllAgentNotPointToday,
  getAgentsPresents,
  createOrUpdateEntree,
  deleteEntreeById,
  getPointageById,
};
function createEntree(entree) {
  return axios
    .post("/pointage/pointer", entree)
    .then(handleRegisterResponse)
    .then((entree) => entree);
}
function createOrUpdateEntree(entree) {
  return axios
    .post("/pointage/create", entree)
    .then(handleRegisterResponse)
    .then((entree) => entree);
}
function deleteEntreeById(id) {
  return axios
    .delete("/pointage/delete/" + id)
    .then(handleRegisterResponse)
    .then((entree) => entree);
}
function getPointageById(id) {
  return axios
    .get("/pointage/getPointageById/" + id)
    .then(handleRegisterResponse)
    .then((entree) => entree);
}
function getAllPointage() {
  return axios
    .get("/pointage/getAllPointage")
    .then(handleRegisterResponse)
    .then((pointages) => pointages);
}

function getAllPointageToday() {
  return axios
    .get("/pointage/getAllPointageToday")
    .then(handleRegisterResponse)
    .then((pointages) => pointages);
}
function getAllAgentNotPointToday() {
  return axios
    .get("/pointage/getAllAgentNotPointToday")
    .then(handleRegisterResponse)
    .then((agents) => agents);
}
function getAgentsPresents() {
  return axios
    .get("/pointage/getAgentsPresents")
    .then(handleRegisterResponse)
    .then((agents) => agents);
}
//   function getCuveByIdCuve(idCuve){
//     return axios.get('/cuve/getCuveByIdCuve/' + idCuve).then(handleRegisterResponse)
//       .then(cuve => cuve);
//   }
//   function getCuveById(cuveId){
//     return axios.get('/cuve/getCuveById/' + cuveId).then(handleRegisterResponse)
//       .then(cuve => cuve);
//   }
//   function getCuveByCuveName(cuveName) {
//     return axios.get('/cuve/getCuveByCuveName/'+ cuveName).then(handleRegisterResponse)
//       .then(cuve => cuve);
//   }
//   function deleteCuveByCuveName(cuveName) {
//     return axios.delete('/cuve/deleteCuveByCuveName/'+ cuveName).then(handleRegisterResponse)
//       .then(cuve => cuve);
//   }

function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log("handleRegisterResponse => error");
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}
