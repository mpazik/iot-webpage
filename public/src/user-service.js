(function (root) {
    const reissueTokenKey = 'reissueToken';
    const userTokenKey = 'userToken';

    const storage = new root.CrossStorageClient(Configuration.gameSiteStorageUrl);
    storage.onConnect().then(() => {
        onLoadedCallbacks.forEach(callback => callback());
    });

    const onLoadedCallbacks = [];
    var userToken = null;

    function parseToken(token) {
        if (typeof token !== 'string') {
            throw new Error('Invalid token specified');
        }
        return JSON.parse(window.atob(token.split('.')[1]));
    }

    const request = {
        request(method, path, data) {
            return new Promise(function (resolve, reject) {
                const httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        if (httpRequest.status >= 200 && httpRequest.status < 300) {
                            resolve(httpRequest.responseText ? JSON.parse(httpRequest.responseText) : undefined, httpRequest.status);
                        } else {
                            reject(JSON.parse(httpRequest.responseText).message, httpRequest.status)
                        }
                    }
                };
                httpRequest.open(method, Configuration.userServiceUrl + '/' + path);
                httpRequest.send(data ? JSON.stringify(data) : undefined);
            });
        },

        get(path) {
            return this.request('get', path);
        },

        post(path, data) {
            return this.request('post', path, data);
        }
    };

    function getReissueToken() {
        return storage.get(reissueTokenKey);
    }

    function saveReissueToken(token) {
        storage.set(reissueTokenKey, token);
    }

    function clearReissueToken() {
        storage.del(reissueTokenKey);
    }

    function getUserToken() {
        return storage.get(userTokenKey).then(token => {
            userToken = parseToken(token);
            return userToken;
        });
    }

    function saveUserToken(token) {
        userToken = parseToken(token);
        storage.set(userTokenKey, token);
    }

    function clearUserToken() {
        userToken = null;
        storage.del(userTokenKey);
    }


    function isTokenValid(token) {
        return token.exp >= Date.now() / 1000;
    }

    root.UserService = {
        onLoaded(callback) {
            onLoadedCallbacks.push(callback);
        },
        isUserLoggedIn() {
            if (userToken) {
                Promise.resolve(userToken.sub);
            }
            return getUserToken().then(userToken => {
                if (!isTokenValid(userToken)) {
                    return Promise.reject('Token expired');
                }
                return Promise.resolve(userToken.sub);
            })
        },
        getUserName() {
            if (userToken) {
                Promise.resolve(userToken.nick);
            }
            return getUserToken().then(userToken => {
                return userToken.nick;
            })
        },
        tryReLogin () {
            return getReissueToken()
                .then(reissueToken => {
                    if (reissueToken == null) {
                        return Promise.reject();
                    }
                    return request.post('reissue', {token: reissueToken});
                })
                .then(response => {
                    saveUserToken(response.loginToken);
                    return userToken.sub
                });
        },
        login (nick, password) {
            return request.post('login', {nick, password}).then(response => {
                saveUserToken(response.loginToken);
                saveReissueToken(response.reissueToken);
            });
        },
        logout () {
            clearUserToken();
            clearReissueToken();
        },
        register (nick, email, password) {
            return request.post('register', {nick, password, email});
        },
        clearUserToken
    };
}(this));
