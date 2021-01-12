import React, { useState } from "react";
import { useRouter } from "next/router";
import { doSignUp, doSignIn } from "../Firebase/firebaseClient";

import {
	Grid,
	makeStyles,
	Paper,
	Typography,
	TextField,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100vw",
		justifyContent: "center",
		display: "flex",
		paddingTop: "20vh",
	},
	paper: {
		padding: theme.spacing(4),
		width: "300px",
	},
	inputs: {
		marginTop: theme.spacing(2),
	},
	btnDiv: {
		display: "flex",
		justifyContent: "flex-end",
	},
}));

const Login: React.FC = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const validEmail = !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	const isInvalid = pwd === "" || email === "" || !validEmail;
	const classes = useStyles();

	const onSubmit = async (evt: any) => {
		try {
			evt.preventDefault();
			if (isInvalid) return;
			await doSignIn(email, pwd); //firebaseClient.auth().signInWithEmailAndPassword(email, pwd)
			router.push("/");
		} catch (error) {
			alert(error);
		}
	};

	const onSignUp = async (evt: any) => {
		try {
			evt.preventDefault();
			if (isInvalid) return;
			await doSignUp(email, pwd); //firebaseClient.auth().createUserWithEmailAndPassword(email, pwd)
			router.push("/");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={3}>
				<Grid
					container
					direction="column"
					spacing={4}
					alignItems="center"
				>
					<Grid item>
						<Typography variant="h5">Login</Typography>
					</Grid>
					<form onSubmit={onSubmit}>
						<TextField
							className={classes.inputs}
							fullWidth
							variant="outlined"
							label="E-Mail"
							id="email"
							name="email"
							autoFocus
							value={email}
							error={email === "" ? false : !validEmail}
							onChange={(evt) =>
								setEmail(evt.target.value.trim())
							}
						/>
						<TextField
							className={classes.inputs}
							fullWidth
							label="Password"
							variant="outlined"
							name="password"
							id="password"
							type="password"
							value={pwd}
							onChange={(evt) => setPwd(evt.target.value)}
						/>
						<div className={classes.btnDiv}>
							<Button
								type="submit"
								color="secondary"
								disabled={isInvalid}
								onClick={onSignUp}
								variant="contained"
								className={classes.inputs}
								style={{ marginRight: "16px" }}
							>
								Sign Up
							</Button>
							<Button
								type="submit"
								color="primary"
								disabled={isInvalid}
								onClick={onSubmit}
								variant="contained"
								className={classes.inputs}
							>
								Sign In
							</Button>
						</div>
					</form>
				</Grid>
			</Paper>
		</div>
	);
};

export default Login;
