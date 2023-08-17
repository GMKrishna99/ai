import { UserButton } from "@clerk/nextjs";

const RootPage = () => {
    return (
        <div>
            RootPage (Protected)
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};
export default RootPage;