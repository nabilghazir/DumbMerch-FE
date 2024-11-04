import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from '../pages/auth'
import { Login } from '../layout/auth/login'
import { Register } from '../layout/auth/register'
import { ProductPage } from '../pages/product-page'
import { LandingPage } from '../pages/landing-page'
import { Product } from '../layout/base/product'
import { ProductDetail } from '../pages/product-detail'
import { Detail } from '../layout/base/detail'
import { Member } from '../pages/member'
import { Profile } from '../layout/base/profile'
import { Cart } from '../layout/base/cart'
import { Complain } from '../layout/base/complain'
import { Admin } from '../pages/admin'
import { Dashboard } from '../layout/admin/dashboard'
import { AdminComplain } from '../layout/admin/admin-complain'
import { AdminCategory } from '../layout/admin/admin-category'
import { AdminProduct } from '../layout/admin/admin-product'

export const Routes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />
        },
        {
            path: "/product",
            element: <ProductPage />,
            children: [
                {
                    index: true,
                    element: <Product />
                },
                {
                    path: ":categoryName",
                    element: <Product />,
                },
            ]
        },
        {
            path: "/product-detail/:productName",
            element: <ProductDetail />,
            children: [
                {
                    index: true,
                    element: <Detail />
                }
            ]
        },
        {
            element: <Member />,
            children: [
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/complain",
                    element: <Complain />
                }
            ]
        },
        {
            element: <Admin />,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />
                },
                {
                    path: "/admin-complain",
                    element: <AdminComplain />
                },
                {
                    path: "/admin-category",
                    element: <AdminCategory />
                },
                {
                    path: "/admin-product",
                    element: <AdminProduct />
                },
            ]
        },
        {
            element: <Auth />,
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }
            ]
        }
    ])






    return <RouterProvider router={router} />

}
