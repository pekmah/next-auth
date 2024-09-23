"use server";

import {RegisterSchema} from "@/app/schemas";
import {actionClient} from "@/lib/actions/safe-action";


export const registerAction = actionClient.schema(RegisterSchema).action(async ({parsedInput}) => {

    const validatedFields = RegisterSchema.safeParse(parsedInput);

    console.log("REGISTRATION FIELDS ARE::", validatedFields);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    return {success: "Registration Successful!"}
});
