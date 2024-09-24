import React from 'react';
import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";

const Page = async () => {
    const session = await auth();

    const handleLogout = async () => {
        "use server";

        await signOut()
    }

    return (
        <div>
            Settings pagess {JSON.stringify(session)}

            <form className={'flex justify-center w-full py-24'} action={handleLogout}>
                <Button type="submit">Logout</Button>
            </form>
        </div>
    );
};

export default Page;
