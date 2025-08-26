import { createBrowserRouter, Navigate, RouteObject  } from "react-router-dom";
import  { JSX, lazy, Suspense } from "react";
import PageNotFound from "../ErrorPages/PageNotFound";
import Home from "../Pages/Home/Home";

const Login = lazy(() => import("../Auth/Login"));
const Signup=lazy(()=>import("../Auth/SignUp"))

const ErrorElement = ()=>{
     return <div className="flex flex-col justify-center items-center h-screen"> 
        <h1 className="text-4xl font-bold text-red-500">Error</h1>
        <p className="text-lg text-gray-700">Something went wrong!</p>
        <p className="text-lg text-gray-700">Please try again later.</p>
     </div>
}


const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

// Public Route Wrapper (redirect authenticated users away from login)
const PublicRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : element;
};
const routelist: RouteObject[] = [
  {
    path: '',
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<Home/>} />, 
      },
      {
        path: 'login',
        element: <Suspense fallback={<div>loading..</div>}>
            <PublicRoute element={<Login/>} />
        </Suspense>,
      },
      {
        path: 'signup',
        element: <Suspense fallback={<div>loading..</div>}>
            <PublicRoute element={<Signup/>}/>
        </Suspense>,
      },

    //   {
    //     path: 'students',
    //     element: <ProtectedRoute element={<StudentList />} />,
    //   },
    //   {
    //     path: 'students/:id',
    //     element: <ProtectedRoute element={<StudentDetails />} />,
    //   },
      {
        path: 'page-not-found',
        element: <PageNotFound />,
      },
      {
        path: '*',
        element: <Navigate to="page-not-found" replace />,
      },
    ],
  },
];


export const globalRouter=createBrowserRouter(routelist)