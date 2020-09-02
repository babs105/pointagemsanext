import axios from "../axios/axios";

export const agentService = {
  createAgent,
  createOrUpdateAgent,
  deleteAgentById,
  getAgentById,
  getAllAgent,
};
function createAgent(agent) {
  return axios
    .post("/agent/addAgent", agent)
    .then(handleRegisterResponse)
    .then((agent) => agent);
}
function createOrUpdateAgent(entree) {
  return axios
    .post("/agent/create", entree)
    .then(handleRegisterResponse)
    .then((agent) => agent);
}
function deleteAgentById(id) {
  return axios
    .delete("/agent/delete/" + id)
    .then(handleRegisterResponse)
    .then((agent) => agent);
}
function getAgentById(id) {
  return axios
    .get("/agent/getAgentById/" + id)
    .then(handleRegisterResponse)
    .then((entree) => entree);
}

function getAllAgent() {
  return axios
    .get("/agent/getAllAgent")
    .then(handleRegisterResponse)
    .then((agents) => agents);
}

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
