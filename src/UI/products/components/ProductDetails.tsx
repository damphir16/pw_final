'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {CartProductType, ProductDetailsProps, SelectedImgType} from "@/UI/products/types/types";
import {Rating} from "@mui/material";
import SetColor from "@/UI/products/components/SetColor";
import SetQuantity from "@/UI/products/components/SetQuantity";
import Button from "@/UI/buttons/components/Button";
import ProductImage from "@/UI/products/components/ProductImage";
import {useCart} from "@/hooks/cart/useCart";
import {MdCheckCircle} from "react-icons/md";
import {useRouter} from "next/navigation";


const ProductDetails : React.FC<ProductDetailsProps> = ( { product } ) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const rating : number = product.data.reviews.reduce(( acc, item ) => item.rating + acc, 0) / product.data.reviews.length;
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.data.id,
        name: product.data.name,
        description: product.data.description,
        category: product.data.category,
        brand: product.data.brand,
        selectedImg: { ...product.data.images[0] },
        quantity: 1,
        price: product.data.price,
    })
    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false);
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex(( item ) => item.id === cartProduct.id);
            if (existingIndex >= 0)
                setIsProductInCart(true);
        }
    }, [cartProducts, cartProduct.id]);

    const handleColorSelect = useCallback(( value : SelectedImgType ) => {
        setCartProduct(( prev ) => {
            return { ...prev, selectedImg: value }
        })
    }, []);

    const handleQuantityIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) return;
        setCartProduct(( prev ) => {
            return { ...prev, quantity: prev.quantity++ }
        })
    }, [cartProduct.quantity]);
    const handleQuantityDecrease = useCallback(() => {
        if (cartProduct.quantity <= 1) return;

        setCartProduct(( prev ) => {
            return { ...prev, quantity: prev.quantity-- }
        })
    }, [cartProduct.quantity]);

    return (
        <div className = { "grid grid-cols-1 md:grid-cols-2 gap-12 " }>
            <div>
                <ProductImage cartProduct = { cartProduct } product = { product }
                              handleColorSelect = { handleColorSelect }/>
            </div>
            <div className = "flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className = { "text-3xl font-medium text-slate-700" }>{ product.data.name }</h2>
                <div className = "flex items-center gap-2">
                    <div><Rating readOnly value = { rating }/></div>
                    <p>{ product.data.reviews.length } reviews</p>
                </div>
                <p className = { "text-justify" }>{ product.data.description }</p>
                <div className = "flex flex-col mt-2">
                    <p><span className = { "font-semibold" }>BRAND: </span>{ product.data.brand }</p>
                    <p><span className = { "font-semibold" }>CATEGORY: </span>{ product.data.category }</p>
                </div>
                <p className = { product.data.inStock ? "text-teal-400" : "text-rose-400" }>{ product.data.inStock ? "In Stock" : "Out of Stock" }</p>
                { isProductInCart ? (
                        <>
                            <p className = { "mb-2 text-slate-500 flex items-center gap-1" }>
                                <MdCheckCircle className = "text-teal-400" size = { 20 }/>
                                <span>Product added to cart</span>

                            </p>
                            <div>
                                <Button label = { "View Cart" } outline onClick = { () => {
                                    router.push("/cart");
                                } } custom = { "max-w-[300px]" }/>
                            </div>
                        </>) :
                    (
                        <>
                            <SetColor images = { product.data.images } cartProduct = { cartProduct }
                                      handleColorSelect = { handleColorSelect }/>
                            <SetQuantity cartProduct = { cartProduct }
                                         handleQuantityIncrease = { handleQuantityIncrease }
                                         handleQuantityDecrease = { handleQuantityDecrease }/>
                            <Button custom = { "max-w-[300px]" } label = { "Add to Cart" }
                                    onClick = { () => handleAddProductToCart(cartProduct) }/>
                        </>) }

            </div>
        </div>
    )
}
export default ProductDetails
