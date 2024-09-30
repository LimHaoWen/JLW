import { SessionProvider } from "next-auth/react";
import LoginForm from "./login";

const Login = () => {
    return (
        <SessionProvider>
            <LoginForm/>
        </SessionProvider>
    )
}

export default Login