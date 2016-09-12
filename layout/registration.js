const main = require('../layout-fragments/main');

module.exports = (data) => {
    const description = data.content;
    data.scripts = ['/src/registration.js'];
    data.content = `
<section id="game-description">
    ${description}
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
        <input type="email" id="email" minlength="3" maxlength="20" required>
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
