import { Box, Grid2 } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ProductEntities } from "../../entities/product-entitities"
import { api } from "../../libs/api"
import { ProductCards } from "./products-cards"


export const Products = () => {
    const { categoryName } = useParams<{ categoryName: string }>()

    const [products, setProducts] = useState<ProductEntities[]>([])

    const fetchProducts = async () => {
        try {
            const endpoint = categoryName
                ? `/category/${categoryName}`
                : `/product/getallproduct`

            const res = await api.get(endpoint)

            const fetchedProducts = categoryName ? res.data.products : res.data
            setProducts(fetchedProducts || [])
        } catch (error) {
            console.error("Error fetching products:", (error as Error).message)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [categoryName])


    return (
        <Box>
            <Grid2 container spacing={0.75}>
                {products.map((product) => (
                    <ProductCards key={product.id} {...product} />
                ))}
            </Grid2>
        </Box>
    )
}
