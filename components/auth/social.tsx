"use client"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

import {Button} from "@/components/ui/button";

export const Social = () => {

    return (
        <div className={"flex items-center w-full gap-x-3"}>
            <Button size={'lg'} className={'w-full'} variant={'outline'} onClick={() => {
            }}>
                <FcGoogle size={'18'}/>
            </Button>

            <Button size={'lg'} className={'w-full'} variant={'outline'} onClick={() => {
            }}>
                <FaGithub size={'18'}/>
            </Button>
        </div>
    )
}
