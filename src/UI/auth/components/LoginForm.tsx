'use client'
import React, {useState} from 'react'
import Heading from "@/UI/Headings/components/Heading";
import Input from "@/UI/auth/components/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/UI/buttons/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit : SubmitHandler<FieldValues> = async ( data ) => {
        setIsLoading(true);

    }
    return (
        <>
            <Heading title = { "Sign in to E~Shop" }/>
            <Button label = { "Continue with Google" } outline icon = { AiOutlineGoogle } onClick = { () => {
            } }/>
            <hr className = "w-full h-px bg-slate-300"/>
            <Input id = { "email" } label = { "email" } disabled = { isLoading } register = { register }
                   errors = { errors }/>
            <Input id = { "password" } label = { "password" } disabled = { isLoading } register = { register }
                   type = { "password" }
                   errors = { errors }/>
            <Button loading = { isLoading } label = { isLoading ? "Loading" : "Login" }
                    onClick = { handleSubmit(onSubmit) }/>
            <p className = { "text-sm" }>
                Do not have an account ? <Link href = { "/auth/register" } className = { "underline" }>Sign up</Link>
            </p>
        </>
    )
}
export default LoginForm
