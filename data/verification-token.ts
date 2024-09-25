import {db} from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email
            }
        })
    } catch (e) {
        throw e;
    }
}


export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                token
            }
        })
    } catch (e) {
        throw e;
    }
}
