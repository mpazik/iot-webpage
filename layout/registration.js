const main = require('../layout-fragments/main');

module.exports = (data) => {
    const description = data.content;

    data.content = `
<section id="game-description">
    ${description}
</section>
<section id="game-registration">
<h2>Register to game</h2>
<form method="post" class="large-input">
    <div class="form-group">
        <label for="login-nick">Nick:</label>
        <input type="text" name="login-nick" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <label for="register-email">Email:</label>
        <input type="email" name="register-email" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <label for="register-password">Password:</label>
        <input type="password" name="register-password" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <label for="register-repeat-password">Repeat Password:</label>
        <input type="password" name="register-repeat-password" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <input type="submit" value="Play!">
    </div>
    <div class="form-group">
        <div id="login-error-message" class="error"></div>        
    </div>
</form>
<a href="/login">Already have an account?</a>
</section>
<div style="clear: both"></div>
`;
    return main(data);
};
