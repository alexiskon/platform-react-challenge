import React from "react";
import Favourites from "./pages/Favourites/Favourites";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Breeds from "./pages/Breeds/Breeds";

export const routeConfig = () => [
    {path: '/', element: <Home />, label: 'Home', headerDisplay: true},
    {path: ":id?", element: <Home />, label: '', headerDisplay: false},
    {path: '/breeds', element: <Breeds />, label: 'Breeds', headerDisplay: true},
    {path: '/breeds/:id?', element: <Breeds />, label: '', headerDisplay: false},
    {path: '/favourites', element: <Favourites />, label: 'Favourites', headerDisplay: true}
]

const AppRoutes: React.FC = () => {
    const routes = useRoutes(routeConfig());
    return routes;
};

export default AppRoutes