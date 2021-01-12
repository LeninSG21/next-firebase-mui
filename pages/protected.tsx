import { Button, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { TOKEN } from "../Firebase/AuthContext";
import { firebaseAdmin } from "../Firebase/firebaseAdmin";
import { doSignOut } from "../Firebase/firebaseClient";
import { useRouter } from "next/router";

interface Props {
	token: firebaseAdmin.auth.DecodedIdToken;
}

const Protected: React.FC<Props> = ({ token }) => {
	const router = useRouter();
	return (
		<>
			<Typography variant="h4">Congrats! You're logged in</Typography>
			<Button
				onClick={() => {
					doSignOut();
					router.push("/");
				}}
				variant="contained"
				color="secondary"
			>
				Logout
			</Button>
			{Object.entries(token).map(([key, pair]) => (
				<h3 key={key}>{`${key} --> ${pair}`}</h3>
			))}
		</>
	);
};

export default Protected;

//code from https://colinhacks.com/essays/nextjs-firebase-authentication
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const cookies = nookies.get(ctx);

		const token = await firebaseAdmin.auth().verifyIdToken(cookies[TOKEN]);
		//Now, you can do data fetching
		return { props: { token } };
	} catch (error) {
		ctx.res.writeHead(302, { Location: "/" });
		ctx.res.end();
		return {
			// The props returned here don't matter because we've
			// already redirected the user.
			props: {} as never,
		};
	}
};
