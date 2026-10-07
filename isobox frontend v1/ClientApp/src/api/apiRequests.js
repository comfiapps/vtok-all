import {apiRequest} from "./request";

export const getMintingData = async (onSuccess, onError) => {
    return await apiRequest({
        method: "GET",
        url: `/api/time`,
        dataType: "text",

    }).then(response => {
        console.log(response);
        if (onSuccess) onSuccess(response);

    }).catch(err => {
        console.log(err);
        if (onError) onError(err);

    });
}

export const getMintingStatus = async (onSuccess, onError) => {
    return await apiRequest({
        method: "GET",
        url: `/api/mitting`,
        dataType: "text",

    }).then(response => {
        console.log(response);
        if (onSuccess) onSuccess(response);

    }).catch(err => {
        console.log(err);
        if (onError) onError(err);

    });
}

export const mintAPI = async (account, recaptchaToken, onSuccess, onError) => {
    return await apiRequest({
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        url: `/api/sitin/${account}?token=${recaptchaToken}`,
        dataType: "json"

    }).then(response => {
        console.log("minting success", response);
        if (onSuccess) onSuccess(response);

    }).catch(err => {
        console.log("minting error", err);
        if (onError) onError(err);

    });
}

export const approvalAPI = async (account, body, onSuccess, onError) => {
    return await apiRequest({
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        url: `/api/approval/${account}`,
        dataType: "json",
        data: body

    }).then(response => {
        console.log("approve success", response);
        if (onSuccess) onSuccess(response);

    }).catch(err => {
        console.log("approve error", err);
        if (onError) onError(err);

    });
}