"use client"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";


export const Social = () => {

    const onClick = async (provider: "google" | "github") => {
        await signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className={"flex items-center w-full gap-x-3"}>
            <Button size={'lg'} className={'w-full'} variant={'outline'} onClick={() => onClick('google')}
            >
                <FcGoogle size={'18'}/>
            </Button>

            <Button size={'lg'} className={'w-full'} variant={'outline'} onClick={() => onClick('github')}>
                <FaGithub size={'18'}/>
            </Button>
        </div>
    )
}
