import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {CartContextProviderProps, CartContextType} from "@/hooks/cart/types/types";
import {CartProductType} from "@/UI/products/types/types";
import toast from "react-hot-toast";

export const CartContext = createContext<CartContextType | null>(null);
export const CartContextProvider = ( props : CartContextProviderProps ) => {
    const [cartTotalQty, setCartTotalQty] = React.useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalAmount, setCartTotalAmount] = React.useState(0);

    useEffect(() => {
        const cartItems : any = localStorage.getItem("eShopCartProducts");
        const cProducts : CartProductType[] | null = JSON.parse(cartItems);
        setCartProducts(cProducts);
    }, [])

    useEffect(() => {
        if (cartProducts) {
            const { total, qty } = cartProducts?.reduce(( acc, item ) => {
                const itemTotal = item.quantity * item.price;
                acc.total += itemTotal;
                acc.qty += item.quantity;
                return acc;
            }, { total: 0, qty: 0 });

            setCartTotalQty(qty);
            setCartTotalAmount(total);
        }
    }, [cartProducts]);


    const handleAddProductToCart = useCallback(( product : CartProductType ) => {
        setCartProducts(( prev ) => {
            let updatedCart;
            updatedCart = prev ? [...prev, product] : updatedCart = [product];
            toast.success("Product added successfully.");
            localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback(( product : CartProductType ) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter(( item ) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts);
            toast.success("Product removed successfully.");
            localStorage.setItem("eShopCartProducts", JSON.stringify(filteredProducts));
            return filteredProducts;
        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback(( product : CartProductType ) => {
        let updatedCart;
        if (product.quantity === 99) {
            return toast.error("Maximun reached");
        }
        if (cartProducts) {
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex(( item ) => item.id === product.id);
            if (existingIndex >= 0) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity;
            }
            setCartProducts(updatedCart);
            localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
        }

    }, [cartProducts])

    const handleCartQtyDecrease = useCallback(( product : CartProductType ) => {
        let updatedCart;
        if (product.quantity === 1) {
            return toast.error("Minimun reached");
        }
        if (cartProducts) {
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex(( item ) => item.id === product.id);
            if (existingIndex >= 0) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity;
            }
            setCartProducts(updatedCart);
            localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
        }

    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem("eShopCartProducts", JSON.stringify(null));
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
    }

    return (<CartContext.Provider value = { value } { ...props }/>)
}
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart() must be used within useContextProvider");
    }
    return context;
}

