const nav = require('../layout-fragments/navigation');

module.exports = (data) =>`
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/theme.css">
        <link rel="stylesheet" type="text/css" href="/style.css">
        <title>${data.title}</title>
    </head>
    <body>
        ${nav()}
        <main class="area">
            ${data.content}
        </main>
    </body>
</html>
`;
