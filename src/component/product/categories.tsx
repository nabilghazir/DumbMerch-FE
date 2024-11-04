import { Stack } from "@mui/material"
import { useEffect, useState } from "react";
import { CategoriesEntities } from "../../entities/categories-entities";
import { api } from "../../libs/api";
import { CategoriesItem } from "./categories-item";



export const Categories = () => {

    const [categories, setCategories] = useState<CategoriesEntities[]>([]);

    const categoriesList = async () => {
        try {
            const res = await api.get("/category/getallcategory");
            setCategories(res.data);
        } catch (error) {
            const err = error as Error
            console.log(err.message)
        }
    }

    useEffect(() => {
        categoriesList();
    }, [])

    return (
        <Stack
            sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
            {categories.map((category, index) => (
                <CategoriesItem key={index} {...category} />
            ))}
        </Stack>
    )
}
