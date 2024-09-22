"use client"

import React from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {LoginSchema} from "@/app/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
    }

    return (
        <CardWrapper
            headerLabel={'Welcome Back'}
            backButtonLabel={'Don\'t have an account?'}
            backButtonHref={'/auth/register'}
            showSocial={true}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className={'space-y-6'}
                >
                    <div
                        className={'space-y-4'}
                    >
                        <FormField
                            control={form.control}
                            name={'email'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        {...field}
                                        type={'email'}
                                        placeholder={'email@example.com'}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        <FormField
                            control={form.control}
                            name={'password'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        {...field}
                                        type={'password'}
                                        placeholder={'*******'}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>

                    <FormError message={"Something went wrong"}/>
                    <FormSuccess message={"Email Sent"}/>

                    {/*  Submit button  */}
                    <Button
                        type={'submit'}
                        className={'w-full'}
                    >
                        Login
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
