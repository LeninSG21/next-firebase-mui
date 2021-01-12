import { Button, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../Firebase/AuthContext";
import { doSignOut } from "../Firebase/firebaseClient";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(5),
	},
	link: {
		fontSize: "large",
	},
	btn: {
		margin: theme.spacing(2, 0, 2, 0),
	},
}));

interface Props {
	isSSR?: boolean;
}

const LandingPage: React.FC<Props> = ({ isSSR }) => {
	const classes = useStyles();
	const user = useAuth();

	return (
		<div className={classes.root}>
			{isSSR ? (
				<>
					<Typography variant="h1" color="primary">
						We did SSR with Cloud Function!
					</Typography>
					{user ? (
						<Typography variant="h5">
							Logged as {user.email}. Open Dev tools &gt;
							Application &gt; Cookies and __session should have a
							token
						</Typography>
					) : (
						<Typography variant="h5" color="secondary">
							No user logged
						</Typography>
					)}

					<Button
						disabled={!user}
						onClick={() => doSignOut()}
						variant="contained"
						color="secondary"
						className={classes.btn}
					>
						Logout
					</Button>

					<ul>
						<li>
							<Link href="/login">
								<a className={classes.link}>Login</a>
							</Link>
						</li>
						<li>
							<Link href="/protected">
								<a className={classes.link}>Protected</a>
							</Link>
						</li>
					</ul>
				</>
			) : (
				<Typography variant="h1" color="secondary">
					Couldn't do SSR :(
				</Typography>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return { props: { isSSR: true } };
};

export default LandingPage;
