(function() {
    function showError(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        errorMessage.style.display = 'block';
    }

    document.querySelector("#page-registration form").onsubmit = function () {
        const nick = document.getElementsByName('nick')[0].value;
        const email = document.getElementsByName('email')[0].value;
        const password = document.getElementsByName('password')[0].value;
        const repeatedPassword = document.getElementsByName('repeat-password')[0].value;

        if (password != repeatedPassword) {
            showError("Passwords are not identical");
            return false;
        }

        UserService.register(nick, email, password)
            .then(() => UserService.login(nick, password))
            .then(Play)
            .catch(showError);
        return false;
    }.bind(this);
}());
