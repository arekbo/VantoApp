import http from "./http-common";

const getAll2 = () => {
    const ret = http.get("/users").catch (function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser 
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

    });

    return ret;
};
const getAll = async () => {
    return await http.get("/users");
};

const get = id => {
    return http.get(`/users/${id}`);
};

const create = data => {
    return http.post("/users", data);
};

const update = (id, data) => {
    return http.put(`/users/${id}`, data);
};

const remove = id => {
    return http.delete(`/users/${id}`);
};

const removeAll = () => {
    return http.delete(`/users`);
};

const usersService = {
    getAll,
    getAll2,
    get,
    create,
    update,
    remove,
    removeAll
};

export default usersService;