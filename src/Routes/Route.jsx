import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Index from "../Component/Index";


const routes = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"/",
                element:<Index/>
            },
            
        ]
    }
])

export default routes