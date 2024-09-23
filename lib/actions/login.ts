"use server";

import {LoginSchema} from "@/app/schemas";
import {actionClient} from "@/lib/actions/safe-action";


export const loginAction = actionClient.schema(LoginSchema).action(async ({parsedInput}) => {

    const validatedFields = LoginSchema.safeParse(parsedInput);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    return {success: "Email Sent"}
});
