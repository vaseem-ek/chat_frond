import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import Home from "../pages/Home";
import MessagePage from "../component/MessagePage";
import Authlayouts from "../layout";
import ForgotPassword from "../pages/ForgotPassword";

const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"register",
                element:<Authlayouts><RegisterPage/></Authlayouts>
            },
            {
                path:"email",
                element:<Authlayouts><CheckEmail/></Authlayouts>
                
            },
            {
                path:"password",
                element:<Authlayouts><CheckPassword/></Authlayouts>
            },
            {
                path:"forgot-password",
                element:<Authlayouts><ForgotPassword/></Authlayouts>
            },
            {
                path:"",
                element:<Home/>,
                children:[
                    {
                        path:":userId",
                        element:<MessagePage/>
                    }
                ]
            },
        ]
    }
])
export default router