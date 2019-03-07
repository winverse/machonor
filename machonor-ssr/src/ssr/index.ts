import { Context } from 'koa';
import render from './ssr.js';

const manifest = require('../../../webuy-client/build/asset-manifest.json');

function buildHtml({ rendered, state, styles }: any) {
  const extractCss = Object.keys(manifest).map((keys) => {
    return keys.match(/.css$/);
  });
  const resultCss = extractCss.filter((el) => {
    return el !== null;
  });
  const extractJs = Object.keys(manifest).map((keys) => {
    return keys.match(/.js$/);
  });
  const resultJs = extractJs.filter((el) => {
    return el !== null;
  });
  const html = `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
    <meta name="theme-color" content="#000000">
    <meta http-equiv="content-script-type" content="text/javascript">
		<link rel="manifest" href="/manifest.json">
		<link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    ${styles}
    <link href="/${resultCss[0].input}" rel="stylesheet">
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${rendered}</div>
    ${
      state
        ? `<script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
    </script>`
        : ''
    }
    <script type="text/javascript" src="${manifest['main.js']}"></script>
    <script src="//cdn.ckeditor.com/4.7.3/full/ckeditor.js"></script>
  </body>
  </html>`;
  return html;
}

const indexHtml = buildHtml({ styles: null, rendered: '', state: null });

const ssr = async (ctx: Context) => {
  const token = ctx.cookies.get('access_token');
  try {
    const { state, html, styles } = await render(ctx);
    const body = buildHtml({ styles, state, rendered: html });
    ctx.body = body;
    // if (token) return;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 404) {
      ctx.status = 404;
      ctx.redirect('/404');
    }
    ctx.body = indexHtml;
  }
};

export default ssr;