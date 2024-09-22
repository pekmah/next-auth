"use client";


import {useRouter} from "next/navigation";

interface LoginBtnProps {
    children?: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

export const LoginBtn = ({
                             children, mode = 'redirect',
                             asChild
                         }: LoginBtnProps) => {

    const router = useRouter()

    const handleClick = () => {
        router.push('/auth/login')
    }

    if (mode === "modal") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }

    return (
        <span className={'cursor-pointer'} onClick={handleClick}>
            {children}
        </span>
    )
}
