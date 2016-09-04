function Play() {
    const newWin = window.open(Configuration.gameUrl);
    if (newWin == null || !newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        window.location.href = Configuration.gameUrl;
    }
}

function UserIsLoggedIn(userId) {
    ga('set', 'userId', userId);

    UserService.getUserName().then((name) => {
        document.getElementById('logged-section').innerHTML = `
You are logged as: <span>${name}</span> <button id='logout-button'>Log out</button>
`;
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', () => {
            UserService.logout();
            UserIsLoggedOut();
            window.location.href = '/login';
        });
    });

    const loginButton = document.getElementById('login-button');
    loginButton.innerHTML = 'Play!';
    loginButton.addEventListener('click', Play);
}

function UserIsLoggedOut() {
    document.getElementById('logged-section').innerHTML = '';

    const loginButton = document.getElementById('login-button');
    loginButton.innerHTML = 'Login';
    loginButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
}

(function () {
    function initGoogleAnalytics() {
        window.ga = window.ga || function () {
                (ga.q = ga.q || []).push(arguments)
            };
        ga.l = +new Date;

        ga('create', 'UA-83670040-1', 'auto');
        ga('send', 'pageview');
    }
    initGoogleAnalytics();

    UserService.onLoaded(() => {
        UserService.isUserLoggedIn()
            .then(UserIsLoggedIn)
            .catch(() => {
                UserService.tryReLogin()
                    .then(UserIsLoggedIn)
                    .catch(UserIsLoggedOut);
            })
    });

}());