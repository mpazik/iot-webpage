const main = require('../layout-fragments/main');

module.exports = (data) => {
    data.content +=`
<form method="post" class="large-input">
    <div class="form-group">
        <label for="login-nick">Nick:</label>
        <input type="text" name="login-nick" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <label for="login-password">Password:</label>
        <input type="password" name="login-password" minlength="3" maxlength="20" required>
    </div>
    <div class="form-group">
        <input type="submit" value="Play!">
    </div>
    <div class="form-group">
        <div id="login-error-message" class="error"></div>        
    </div>
</form>
<a href="/registration">Don't have an account?</a><br />
<a href="/remind-password">Forgot your password?</a>
`;
    return main(data);
};

