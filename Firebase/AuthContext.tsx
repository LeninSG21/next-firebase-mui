import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebaseClient } from "./firebaseClient";

/*
 * It is extremely important to leave the name of the cookie as "__session"
 * It is the only cookie that Cloud Functions retain. This is the one that
 * Will save the auth token. That is why it is left as a constant that can
 * be imported in other files that need access to this cookie
 */
export const TOKEN = "__session";

//Code from https://colinhacks.com/essays/nextjs-firebase-authentication
const AuthContext = createContext<firebaseClient.User | null>(null);

export function AuthProvider({ children }: any) {
	const [user, setUser] = useState<firebaseClient.User | null>(null);

	useEffect(() => {
		if (typeof window !== undefined) {
			(window as any).nookies = nookies;
		}
		return firebaseClient.auth().onIdTokenChanged(async (user) => {
			//console.log(`token changed!`);
			if (!user) {
				//console.log(`no token found...`);
				setUser(null);
				nookies.destroy(null, TOKEN);
				nookies.set(null, TOKEN, "", { path: "/" });
				return;
			}

			//console.log(`updating token...`);
			const token = await user.getIdToken();
			setUser(user);
			nookies.destroy(null, TOKEN);
			nookies.set(null, TOKEN, token, { path: "/" });
		});
	}, []);

	// force refresh the token every 10 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			//console.log(`refreshing token...`);
			const user = firebaseClient.auth().currentUser;
			if (user) await user.getIdToken(true);
		}, 10 * 60 * 1000);
		return () => clearInterval(handle);
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
