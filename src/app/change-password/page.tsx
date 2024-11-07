import { SessionProvider } from "next-auth/react";
import ChangePassword from "./changePassword";

const Change = () => {
    return (
        <SessionProvider>
            <ChangePassword/>
        </SessionProvider>
    )
}

export default Change