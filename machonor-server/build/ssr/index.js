"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('server side rendering start');
const render_js_1 = require("./render.js");
const manifest = require('../../../webuy-client/build/asset-manifest.json');
function buildHtml({ rendered, state, styles }) {
    const html = `<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="utf-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <meta name="theme-color" content="#000000">
    <meta http-equiv="content-script-type" content="text/javascript">
		<link rel="manifest" href="/manifest.json">
		<link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    <link href="/${manifest['app.css']}" rel="stylesheet">
    ${styles}
	</head>

	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root">${rendered}</div>
		${state
        ? `<script>
        window.__PRELOADED_STATE__ = ${state}
    </script>`
        : ''}
    <script type="text/javascript" src="/${manifest['vendor.js']}"></script>
    <script type="text/javascript" src="/${manifest['app.js']}"></script>
    <script src="//cdn.ckeditor.com/4.7.3/full/ckeditor.js"></script>
	</body>
  </html>`;
    return html;
}
const indexHtml = buildHtml({ styles: null, rendered: '', state: null });
const ssr = async (ctx) => {
    const token = ctx.cookies.get('access_token');
    try {
        const { state, html, styles } = await render_js_1.default(ctx);
        ctx.body = buildHtml({ styles, state, rendered: html });
        if (token)
            return;
    }
    catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            ctx.status = 404;
            ctx.redirect('/404');
        }
        ctx.body = indexHtml;
    }
};
exports.default = ssr;
//# sourceMappingURL=index.js.map