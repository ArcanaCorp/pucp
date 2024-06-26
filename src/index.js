import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UIProvider } from "./context/UI/UIContext";
import { AuthProvider } from "./context/Auth/AuthContext";
import { FilterProvider } from "./context/Filter/FilterContext";

import AuthLayout from "./layout/AuthLayout";
import FormLogin from "./components/Auth/FormLogin";
import FormSign from "./components/Auth/FormSign";
import DashboardLayout from "./layout/DashboardLayout";
import HomeView from "./view/HomeView";
import DocumentsView from "./view/DocumentsView";
import OrdersView from "./view/OrdersView";
import QuotesView from "./view/QuotesView";
import SalesView from "./view/SalesView";
import ErrorScreen from "./screens/ErrorScreen";

import './static/css/global.css'
import FormRecover from "./components/Auth/FormRecover";
import { DBProvider } from "./context/Data/DBContext";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout/>,
        errorElement: <ErrorScreen/>,
        children: [
            {
                path: '/',
                element: <FormLogin/>
            },
            {
                path: '/sign',
                element: <FormSign/>
            },
            {
                path: '/recover',
                element: <FormRecover/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        errorElement: <ErrorScreen/>,
        children: [
            {
                path: '/dashboard',
                element: <HomeView/>
            },
            {
                path: '/dashboard/documents',
                element: <DocumentsView/>
            },
            {
                path: '/dashboard/orders',
                element: <OrdersView/>
            },
            {
                path: '/dashboard/quotes',
                element: <QuotesView/>
            },
            {
                path: '/dashboard/sales',
                element: <SalesView/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <UIProvider>

        <AuthProvider>

            <DBProvider>
            
                <FilterProvider>
        
                    <RouterProvider router={router} />
                
                </FilterProvider>
            
            </DBProvider>
    
        </AuthProvider>
    
    </UIProvider>

)