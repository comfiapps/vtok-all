import axios from "axios";

export const apiRequest = async (options) => {
    return await axios(options).then(response => {
        if (response.status !== 200) return response.data.then(Promise.reject.bind(Promise));
        return response.data;
    }).catch(Promise.reject.bind(Promise));
}