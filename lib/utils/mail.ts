import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        html: `
            <h2>Verify your email</h2>
            </br>
            <p>Click the link below to verify your email.</p>
            <a href="${confirmLink}">Verify Email</a>
        `
    })
}
