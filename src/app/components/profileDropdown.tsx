import Link from "next/link";
import { SignOut } from "../../lib/authActions";

interface ProfileProps {
    isProfile: boolean
    closeAll: () => void
}

const ProfileDropdown: React.FC<ProfileProps> = ({ isProfile, closeAll }) => {

    const handleSignOut = () => {
        closeAll()
        SignOut()
    }

    return (
    <>
    <ul className={`w-full h-40 text-sm font-medium fixed text-center place-content-center bg-lightverm transition-all 
        duration-400 ease-out z-20 top-0 right-0 lg:w-48 lg:h-52 lg:text-base lg:mt-20 lg:mr-40 lg:rounded-2xl
        ${isProfile ? 'translate-y-0 opacity-100 visible' : 'translate-y-[-100px] opacity-0 invisible'}`}>
            <Link className="w-full h-5 block" href="/points" onClick={closeAll}>
                View points
            </Link>
            <Link className="w-full h-5 mt-6 block" href="/manage-account" onClick={closeAll}>
                Manage account
            </Link>
            <button className="w-full h-5 mt-6 block" onClick={handleSignOut}>
                Logout
            </button>
    </ul>
    </>
    )
}
export default ProfileDropdown 