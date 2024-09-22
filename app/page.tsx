import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {LoginBtn} from "@/components/auth/login-btn";

const font = Poppins({
    subsets: ['latin'],
    weight: ["600"]
})

export default function Home() {
    return (
        <main
            className={'flex h-full flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'}>
            <div className={'flex flex-col justify-center items-center space-y-6'}>
                <h1
                    className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}
                >
                    Auth
                </h1>

                <p className={'text-white text-lg'}>
                    Next authentication service
                </p>

                <div>
                    <LoginBtn>
                        <Button variant={'secondary'} size={'lg'} className={'font-medium text-base'}>Sign In</Button>
                    </LoginBtn>
                </div>
            </div>
        </main>
    );
}
