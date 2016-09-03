(function() {
    function showError(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        errorMessage.style.display = 'block';
    }
    document.getElementById('error-message').style.display = 'none';

    document.querySelector("#page-login form").onsubmit = function () {
        const nick = document.getElementsByName('nick')[0].value;
        const password = document.getElementsByName('password')[0].value;

        UserService.login(nick, password)
            .then(() => {
                document.getElementById('error-message').style.display = 'none';
                UserIsLoggedIn();
                Play();
            })
            .catch(showError);
        return false;
    }.bind(this);
}());