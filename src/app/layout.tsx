import type {Metadata} from "next";
import "./globals.css";
import {Poppins} from "next/font/google";
import NavBar from "@/UI/navBar/components/NavBar";
import Footer from "@/UI/footer/components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '700'] })

export const metadata : Metadata = {
    title: "E-shop",
    description: "E-commerce application",
};

export default function RootLayout ( {
                                         children,
                                     } : Readonly<{
    children : React.ReactNode;
}> ) {
    return (
        <html lang = "en">
        <body className = { `${ poppins.className } antialiased text-slate-700` }>
        <div className = { "flex flex-col min-h-screen " }>
            <NavBar/>
            <main className = { "flex-grow" }>{ children }</main>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
