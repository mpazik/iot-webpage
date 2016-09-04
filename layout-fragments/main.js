const nav = require('./navigation');

module.exports = (data) => {
    var scripts = '';
    if (data.scripts) {
        scripts = data.scripts.map(script => `<script src="${script}"></script>`).join('/n');
    }
    return `
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/theme.css">
        <link rel="stylesheet" type="text/css" href="/style.css">
        <link rel="icon" type="image/png" href="/images/icon.png">
        <script src="/src/configuration.js"></script>
        <title>${data.title}</title>
    </head>
    <body>
        <script src="/src/cross-site-storage.js"></script>
        <script src="/src/user-service.js"></script>
        <script src="/src/main.js"></script>
        <header>
        <a id="logo" href="/"></a>
        <div id="logged-section"></div>
        </header>
        ${nav()}
        <main class="area" id="${data.id}">
            ${data.content}
        </main>
        ${scripts}
    </body>
</html>
`
};
