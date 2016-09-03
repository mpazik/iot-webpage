const main = require('../layout-fragments/main');

module.exports = (data) => {
    data.scripts = ['//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7'];
    data.content += `
<div id="fb-root"></div>
<div class="fb-page"
    data-href="https://www.facebook.com/islesoftales"
    data-tabs="timeline" data-small-header="false"
    data-width="900"
    data-hide-cover="false"
    data-show-facepile="true">
    <blockquote cite="https://www.facebook.com/islesoftales" class="fb-xfbml-parse-ignore">
        <a href="https://www.facebook.com/islesoftales">Isles of Tales</a>
    </blockquote>
</div>
`;
    return main(data);
};

