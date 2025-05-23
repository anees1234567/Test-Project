import { createBrowserRouter, Navigate, RouteObject  } from "react-router-dom";
import React from "react";
import PageNotFound from "../ErrorPages/PageNotFound";
import Home from "../Pages/Home/Home";


const routelist:RouteObject[]=[
    {
        path:"",
        element:<Home/>
    },
    {
        path:"*",
        element:<Navigate to={"page-not-found"}/>
    },
    {
        path:"page-not-found",
        element: <PageNotFound/>
    }
]


export const globalRouter=createBrowserRouter(routelist)