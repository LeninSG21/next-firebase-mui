import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

export const theme = createMuiTheme({});

const ThemeWrapper: React.FC = ({ children }) => {
	//In here, an state can be added to save the theme, in case
	//You need to change it through your app
	return (
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default ThemeWrapper;
