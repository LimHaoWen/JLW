import { SessionProvider } from "next-auth/react";
import ManageAccount from "./manageAccount";

const Manage = () => {
    return (
        <SessionProvider>
            <ManageAccount/>
        </SessionProvider>
    )
}

export default Manage