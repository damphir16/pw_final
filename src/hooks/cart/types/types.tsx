import React from 'react';
import {CartProductType} from "@/UI/products/types/types";

export type CartContextType = {
    cartTotalQty : number,
    cartTotalAmount : number,
    cartProducts : CartProductType[] | null,
    handleAddProductToCart : ( product : CartProductType ) => void,
    handleRemoveProductFromCart : ( product : CartProductType ) => void,
    handleCartQtyIncrease : ( product : CartProductType ) => void,
    handleCartQtyDecrease : ( product : CartProductType ) => void,
    handleClearCart : () => void,
}

export interface CartContextProviderProps {
    [propName : string] : React.ReactNode
}