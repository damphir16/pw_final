import React from 'react'
import {products} from '@/utils/products'
import ProductCard from '@/UI/products/components/ProductCard'

const ProductsContainer = () => {
    return (
        <div className = { "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8" }>{
            products.map(( product, index : number ) => {
                return <ProductCard key = { index } data = { product }/>;
            })
        }</div>
    )
}
export default ProductsContainer
