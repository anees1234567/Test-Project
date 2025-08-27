import { Navigate, RouteObject } from "react-router-dom";
import { JSX } from "react";
import StudentList from "../Pages/Students/StudentList";
import StudentDetails from "../Pages/Students/StudentDetails";

const isAuthenticated = () => !!localStorage.getItem("authToken");

// Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) =>
  isAuthenticated() ? element : <Navigate to="/login" replace />;

export const studentRoutes: RouteObject[] = [
  {
    path: "students",
    element: <ProtectedRoute element={<StudentList />} />,
  },
  {
    path: "students/:id",
    element: <ProtectedRoute element={<StudentDetails />} />,
  },
];
