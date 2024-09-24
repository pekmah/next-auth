"use server";

import {AuthError} from "next-auth";

import {signIn} from "@/auth";
import {LoginSchema} from "@/app/schemas";
import {actionClient} from "@/lib/actions/safe-action";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";


export const loginAction = actionClient.schema(LoginSchema).action(async ({parsedInput}) => {

    const validatedFields = LoginSchema.safeParse(parsedInput);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    const {email, password} = validatedFields.data;

    try {
        await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return {error: "Invalid Credentials"}
                default:
                    return {error: "An error occurred"}
            }
        }

        throw e
    }

    return {success: "Email Sent"}
});
