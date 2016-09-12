(function() {
    function showError(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        errorMessage.style.display = 'block';
    }
    document.getElementById('error-message').style.display = 'none';

    document.getElementById('registration-form').onsubmit = function () {
        const nick = document.getElementById('login-nick').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const repeatedPassword = document.getElementById('repeat-password').value;

        if (password != repeatedPassword) {
            showError("Passwords are not identical");
            return false;
        }

        UserService.register(nick, email, password)
            .then(() => {
                document.getElementById('error-message').style.display = 'none';
                UserService.login(nick, password)
            })
            .then(Play)
            .catch(showError);
        return false;
    }.bind(this);
}());
