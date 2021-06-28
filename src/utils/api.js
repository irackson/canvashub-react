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
    /* newDrawing = {
        "title": "small title", // string
        "creator": "small creator", // string
        "height": 4, // integer
        "width": 4 // integer
    } */
    const response = await fetch(`${apiRoute}/drawings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDrawing),
    });

    const data = await response.json();

    return new Promise(function (myResolve) {
        myResolve(data);
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
    const status = await response.status();

    return new Promise(function (myResolve) {
        myResolve(status);
    });
};

export const fetchDrawingUpdateProperties = async (id, updatedDrawing) => {
    const response = await fetch(`${apiRoute}/drawings/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDrawing),
    });

    const data = await response.json();

    return new Promise(function (myResolve) {
        myResolve(data);
    });
};

/* export const fetchDrawingCheckOut = async (id) => {
    const response = await fetch(`${apiRoute}/drawings/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked_out: true }),
    });

    const status = await response.status();

    return new Promise(function (myResolve) {
        myResolve(status);
    });
};

export const fetchDrawingCheckIn = async (id) => {
    const response = await fetch(`${apiRoute}/drawings/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked_out: false }),
    });

    const status = await response.status();

    return new Promise(function (myResolve) {
        myResolve(status);
    });
}; */

export const fetchImageCreate = async (drawingId, clampedArray) => {
    const newImage = {
        bytes: '{' + clampedArray.toString() + '}',
    };
    const response = await fetch(`${apiRoute}/drawings/${drawingId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newImage),
    });

    const data = await response.json();

    return new Promise(function (myResolve) {
        myResolve(data);
    });
};
