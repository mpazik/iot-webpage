function Play() {
    const newWin = window.open(Configuration.gameUrl);
    if (newWin == null || !newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        window.location.href = Configuration.gameUrl;
    }
}

function initGoogleAnalytics(userId) {
    window['GoogleAnalyticsObject'] = 'ga';
    window.ga = window.ga || function () {
            (window.ga.q = window.ga.q || []).push(arguments)
        };
    window.ga.l = 1 * new Date();

    if (userId) {
        ga('create', 'UA-83670040-1', 'auto', {userId});
    } else {
        ga('create', 'UA-83670040-1', 'auto');
    }
    ga('send', 'pageview');
}

function UserIsLoggedIn(userId) {
    initGoogleAnalytics(userId);

    UserService.getUserName().then((name) => {
        document.getElementById('logged-section').innerHTML = `
You are logged as: <span>${name}</span> <button id='logout-button'>Log out</button>
`;
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', () => {
            UserService.logout();
            window.location.href = '/login';
        });
    });

    const loginButton = document.getElementById('login-button');
    loginButton.innerHTML = 'Play!';
    loginButton.addEventListener('click', Play);
}

function UserIsLoggedOut() {
    initGoogleAnalytics();
    document.getElementById('logged-section').innerHTML = '';

    const loginButton = document.getElementById('login-button');
    loginButton.innerHTML = 'Login';
    loginButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
}

(function () {
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