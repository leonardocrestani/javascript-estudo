class HttpService {

    get(url) {
        return fetch(url)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    }
                    else {
                        throw new Error(res.statusText);
                    }
                });
    }

    post(url, dado) {
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(dado)
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(res.statusText);
            }
        });
    }

}