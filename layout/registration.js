const main = require('../layout-fragments/main');

module.exports = (data) => {
    const description = data.content;
    data.scripts = ['/src/registration.js', '//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7&appId=584554898422237'];
    data.content = `
<section id="game-description">
    ${description}
    <div class="fb-like" data-href="https://www.facebook.com/islesoftales" data-layout="button" data-action="like" data-size="large" data-show-faces="ture" data-share="true"></div>
</section>
<section id="game-registration">
<h2>Register to game</h2>
<form method="post" class="large-input" id="registration-form">
    <div class="form-group">
        <label for="login-nick">Nick:</label>
        <input type="text" id="login-nick" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" minlength="3" maxlength="50" required>
    </div>
    <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <label for="repeat-password">Repeat Password:</label>
        <input type="password" id="repeat-password" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <input type="submit" value="Play!">
    </div>
    <div id="error-message" class="form-group error"></div>
</form>
<a href="/login">Already have an account?</a>
</section>
<div style="clear: both"></div>
`;
    return main(data);
};
