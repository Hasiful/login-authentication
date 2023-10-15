import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main";
import RegisterForm from "../components/registerform/registerform";
import Login from "../components/login/login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: "signup",
                element: <RegisterForm></RegisterForm>
            },
            {
                path: "login",
                element: <Login></Login>
            },
        ]
    }
])