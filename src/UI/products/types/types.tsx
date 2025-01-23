export interface ProductCardProps {
    data : {
        id : string
        name : string
        description : string
        price : number
        brand : string
        category : string
        inStock : boolean
        images : [
            {
                color : string
                colorCode : string
                image : string
            }
        ],
        reviews : [
            {
                id : string
                userId : string
                productId : string
                rating : number,
                comment : string,
                createdDate : string,
                user : {
                    id : string,
                    name : string,
                    email : string,
                    emailVerified : null,
                    image : string,
                    hashedPassword : null,
                    createdAt : string,
                    updatedAt : string,
                    role : string,
                },
            },
        ],
    }
}

export interface ProductDetailsProps {
    product : ProductCardProps
}

export type CartProductType = {
    id : string,
    name : string,
    description : string,
    category : string,
    brand : string,
    selectedImg : SelectedImgType,
    quantity : number,
    price : number,
}

export type SelectedImgType = {
    color : string,
    colorCode : string,
    image : string,
}

export interface SetColorProps {
    images : SelectedImgType[],
    cartProduct : CartProductType,
    handleColorSelect : ( value : SelectedImgType ) => void,
}

export interface SetQuantityProps {
    cartCounter? : boolean,
    cartProduct : CartProductType,
    handleQuantityIncrease : () => void,
    handleQuantityDecrease : () => void,
}

export interface ProductImageProps {
    cartProduct : CartProductType,
    product : ProductCardProps,
    handleColorSelect : ( value : SelectedImgType ) => void,
}

export interface ListRatingProps {
    product : ProductCardProps
}