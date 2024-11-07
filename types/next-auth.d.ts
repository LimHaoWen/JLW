import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
        username: string;
		role: "USER" | "ADMIN";
	}

	interface Session {
		user?: User;
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
        username: string;
		role: "USER" | "ADMIN";
	}
}
