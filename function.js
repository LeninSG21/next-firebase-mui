const { https } = require("firebase-functions");
const { default: next } = require("next");

//code from https://medium.com/wesionary-team/deploying-next-js-application-on-firebase-platform-using-cloud-function-with-firebase-hosting-920157f03267

const isDev = process.env.NODE_ENV !== "production";

const server = next({
	dev: isDev,
	//location of .next generated after running -> yarn build
	conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();
exports.nextSSRFirebase = https.onRequest((req, res) => {
	return server.prepare().then(() => nextjsHandle(req, res));
});
