"use server";

import bcrypt from "bcryptjs";

import {RegisterSchema} from "@/app/schemas";
import {actionClient} from "@/lib/actions/safe-action";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {getUserByEmail} from "@/data/user";


export const registerAction = actionClient.schema(RegisterSchema).action(async ({parsedInput}) => {

    const validatedFields = RegisterSchema.safeParse(parsedInput);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    const {email, password, name} = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "User already exists"}
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })

    // TODO: Send verification code to email

    // refresh screen
    revalidatePath("/auth/register")

    return {success: "User Created"}
});
