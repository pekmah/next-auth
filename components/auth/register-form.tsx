"use client";

import React, {useCallback} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RegisterSchema} from "@/app/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import {registerAction} from "@/lib/actions/register";

const RegisterForm = () => {

    const {isExecuting, execute, result: {data: response}} = useAction(registerAction);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const renderRegistrationResponse = useCallback(() => {
        if (response?.success) {
            return <FormSuccess message={response.success}/>
        } else if (response?.error) {
            return <FormError message={response.error}/>
        }
    }, [response]);

    return (
        <CardWrapper
            headerLabel={'Create an account'}
            backButtonLabel={'Already have an account?'}
            backButtonHref={'/auth/login'}
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
                            name={'name'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <Input
                                        {...field}
                                        disabled={isExecuting}
                                        type={'text'}
                                        placeholder={'Your Name'}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}/>

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

                    {renderRegistrationResponse()}

                    {/*  Submit button  */}
                    <Button
                        type={'submit'}
                        className={'w-full'}
                        disabled={isExecuting}
                    >
                        Create Account
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;
