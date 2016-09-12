(function () {
    function showError(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        errorMessage.style.display = 'block';
    }

    document.getElementById('error-message').style.display = 'none';

    document.querySelector("#page-login form").onsubmit = function () {
        const nick = document.getElementsByName('nick')[0].value;
        const password = document.getElementsByName('password')[0].value;

        // If user wasn't logged before registration, set user it to google analytics
        UserService.isUserLoggedIn()
            .then(() => true)
            .catch(() => false)
            .then((wasUserLoggedIn) => {
                return UserService.login(nick, password).then((userId) => {
                    if (!wasUserLoggedIn) {
                        ga('set', 'userId', userId);
                    }
                    document.getElementById('error-message').style.display = 'none';
                    Play();
                });
            })
            .catch(showError);

        return false;
    }.bind(this);
}());