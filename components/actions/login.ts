"use server";

import {LoginSchema} from "@/app/schemas";
import {createSafeActionClient} from "next-safe-action";

const actionClient = createSafeActionClient();

export const loginAction = actionClient.schema(LoginSchema).action(async ({parsedInput}) => {

    const validatedFields = LoginSchema.safeParse(parsedInput);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    return {success: "Email Sent"}
});

// export const login = async (values: any) => {
//
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     console.log("FORM DATA IS:::", values)
//
//     const validatedFields = LoginSchema.safeParse(values);
//
//     if (!validatedFields.success) {
//         return {error: "Invalid Fields"}
//         // throw new Error("Invalid fields");
//     }
//
//     return {success: "Email Sent"}
//
// }
