import React from "react";
import Head from "next/head";
import ThemeWrapper from "../Theme";
import { AuthProvider } from "../Firebase/AuthContext";

//code from https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>My Page</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			{/* Material-UI Theme Provider */}
			<ThemeWrapper>
				{/* Firebase Auth Provider. Returns a Firebase.User */}
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ThemeWrapper>
		</>
	);
}

export default MyApp;
