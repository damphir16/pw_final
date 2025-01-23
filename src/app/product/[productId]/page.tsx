import React from 'react'
import {ProductProps} from "@/app/product/types/types";
import Container from "@/UI/container/components/Container";
import ProductDetails from "@/UI/products/components/ProductDetails";
import ListRating from "@/UI/products/components/ListRating";
import {products} from "@/utils/products";
import {iPhone} from "@/utils/iPhone";


const ProductPage = async ( { params } : { params : ProductProps } ) => {
    const productF = products.find(( item ) => item.id === params.productId);
    return (
        <div className = "p-8">
            <Container>
                <ProductDetails product = { iPhone }/>
                <div className = { "flex flex-col mt-20 gap-4" }>
                    <div>add rating</div>
                    <ListRating product = { iPhone }/>
                </div>
            </Container>
        </div>
    )
}
export default ProductPage
