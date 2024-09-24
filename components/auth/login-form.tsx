"use client";

import React, {useCallback} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {LoginSchema} from "@/app/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {loginAction} from "@/lib/actions/login";
import {useAction} from "next-safe-action/hooks";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import {useSearchParams} from "next/navigation";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked"
        ? "Email already in use with different provider"
        : " ";

    const {isExecuting, execute, result: {data: response}} = useAction(loginAction);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const renderResponse = useCallback(() => {
        if (response?.success) {
            return <FormSuccess message={response.success}/>
        } else if (response?.error || urlError) {
            return <FormError message={response?.error || urlError}/>
        }
    }, [response, urlError]);

    return (
        <CardWrapper
            headerLabel={'Welcome Back'}
            backButtonLabel={'Don\'t have an account?'}
            backButtonHref={'/auth/register'}
            showSocial={true}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(execute)}
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
                                        disabled={isExecuting}
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
                                        disabled={isExecuting}
                                        {...field}
                                        type={'password'}
                                        placeholder={'*******'}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>

                    {renderResponse()}

                    {/*  Submit button  */}
                    <Button
                        type={'submit'}
                        className={'w-full'}
                        disabled={isExecuting}
                    >
                        Login
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
