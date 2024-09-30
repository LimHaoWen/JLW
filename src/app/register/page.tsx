import { SessionProvider } from "next-auth/react";
import SignupForm from "./register";

const Register = () => {
    return (
        <SessionProvider>
            <SignupForm/>
        </SessionProvider>
    )
}

export default Register