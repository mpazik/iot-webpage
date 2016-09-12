(function () {
    function showError(error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error;
        errorMessage.style.display = 'block';
    }

    window.fbAsyncInit = function() {
        FB.Event.subscribe('edge.create', function (url) {
            ga('send', {
                hitType: 'social',
                socialNetwork: 'Facebook',
                socialAction: 'like',
                socialTarget: url
            });
        });
    };

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
            .then((userId) => {
                document.getElementById('error-message').style.display = 'none';

                ga('send', {
                    hitType: 'event',
                    eventCategory: 'form',
                    eventAction: 'submit',
                    eventLabel: 'registration'
                });

                // If user wasn't logged before registration, set user it to google analytics
                return UserService.isUserLoggedIn()
                    .catch(() => {
                        ga('set', 'userId', userId);
                    })
                    .then(() => UserService.login(nick, password));
            })
            .then(Play)
            .catch(showError);
        return false;
    }.bind(this);
}());
