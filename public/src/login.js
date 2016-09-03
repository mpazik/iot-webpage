(function() {
    function showError(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        errorMessage.style.display = 'block';
    }

    document.querySelector("#page-login form").onsubmit = function () {
        const nick = document.getElementsByName('nick')[0].value;
        const password = document.getElementsByName('password')[0].value;

        UserService.login(nick, password)
            .then(() => {
                UserIsLoggedIn();
                Play();
            })
            .catch(showError);
        return false;
    }.bind(this);
}());