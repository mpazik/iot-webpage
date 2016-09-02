const nav = require('../layout-fragments/navigation');

module.exports = (data) =>`
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/theme.css">
        <link rel="stylesheet" type="text/css" href="/style.css">
        <title>${data.title}</title>
        <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
    </head>
    <body>
        ${nav()}
        <main class="area">
            ${data.content}
        </main>
    </body>
</html>
`;
