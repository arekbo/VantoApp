import http from "./http-randomuser-common";

const getOneUser = async () => {
    return await http.get("/");
};

const getNumberUsers = async (number) => {
    return await http.get(`/?results=${number}`);
};

const randomusersService = {
    getOneUser,
    getNumberUsers
};

export default randomusersService;