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
        <title>${data.title}</title>
        ${scripts}
    </head>
    <body>
        ${nav()}
        <main class="area" id="${data.id}">
            ${data.content}
        </main>
    </body>
</html>
`
};
