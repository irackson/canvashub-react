const apiRoute = process.env.REACT_APP_API_URL;

export const fetchDrawingsIndex = async () => {
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await fetch(`${apiRoute}/drawings`, requestOptions);
    const data = await response.json();

    return new Promise(function (myResolve) {
        myResolve(data);
    });
};

export const fetchDrawingById = async (id) => {
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await fetch(`${apiRoute}/drawings/${id}`, requestOptions);
    const data = await response.json();

    return new Promise(function (myResolve) {
        myResolve(data);
    });
};

export const fetchDrawingCreate = async (newDrawing) => {
    const response = await fetch(`${apiRoute}/drawings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDrawing),
    });
    return new Promise(function (myResolve) {
        myResolve(response);
    });
};

export const fetchDrawingDelete = async (id) => {
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await fetch(`${apiRoute}/drawings/${id}`, requestOptions);
    const status = await response.status;

    return new Promise(function (myResolve) {
        myResolve(status);
    });
};

export const fetchImageCreate = async (drawingId, newCommit) => {
    const response = await fetch(`${apiRoute}/drawings/${drawingId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommit),
    });
    return new Promise(function (myResolve) {
        myResolve(response);
    });
};
