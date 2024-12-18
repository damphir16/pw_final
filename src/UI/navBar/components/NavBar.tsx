import React from 'react'
import Container from "@/UI/container/components/Container";
import LinkButton from "@/UI/buttons/components/LinkButton";
import NavBarContainer from "@/UI/container/components/NavBarContainer";
import {Redressed} from "next/font/google";

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = () => {
    return (
        <nav className = { "sticky top-0 w-full bg-slate-200 z-30 shadow-sm" }>
            <div className = { "py-4 border-b-[1px]" }>
                <Container>
                    <NavBarContainer className = { "flex items-center justify-between gap-3 md:gap-0" }>
                        <LinkButton link = { "/" } text = { "E-Shop" }
                                    className = { `${ redressed.className } font-bold text-2xl` }/>
                        <div>Search Bar component</div>
                        <div> {/*TO-DO convertir este div en un container component*/ }
                            <div className = { "hidden md:block" }>Cart component</div>
                            <div>UserMenu component</div>
                        </div>
                    </NavBarContainer>
                </Container>
            </div>
        </nav>
    )
}
export default NavBar
