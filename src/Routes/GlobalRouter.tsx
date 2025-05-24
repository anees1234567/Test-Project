import { createBrowserRouter, Navigate, RouteObject  } from "react-router-dom";
import React from "react";
import PageNotFound from "../ErrorPages/PageNotFound";
import Home from "../Pages/Home/Home";
const ErrorElement = ()=>{
     return <div className="flex flex-col justify-center items-center h-screen"> 
        <h1 className="text-4xl font-bold text-red-500">Error</h1>
        <p className="text-lg text-gray-700">Something went wrong!</p>
        <p className="text-lg text-gray-700">Please try again later.</p>
     </div>
}

const routelist:RouteObject[]=[
    {
        path:"",
        errorElement:<ErrorElement/>,
        children:[
            {
                index:true,
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
        ],
    
    },
    
]


export const globalRouter=createBrowserRouter(routelist)