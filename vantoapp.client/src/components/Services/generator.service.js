import http from "./http-common";

const generate = async () => {
    return await http.get("/generator/generate");
};

const generatorService = {
    generate
};

export default generatorService;