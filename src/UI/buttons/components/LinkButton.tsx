import React from 'react'
import Link from "next/link";
import {LinkButtonProps} from "@/UI/buttons/types/types";

const LinkButton : React.FC<LinkButtonProps> = ( props : LinkButtonProps ) => {
    return (
        <Link href = { props.link } className = { props.className }>{ props.text }</Link>
    )
}
export default LinkButton
