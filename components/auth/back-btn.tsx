import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface BackBtnProps {
    label: string,
    href: string
}

const BackBtn = ({label, href}: BackBtnProps) => {


    return (
        <Button
            size={'sm'}
            className={'font-normal w-full'}
            variant={'link'}
            asChild={true}
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    );
};

export default BackBtn;
