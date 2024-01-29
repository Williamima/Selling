import { Route } from "react-router-dom"
import { PublicRoutes } from "./PublicRoutes"
import { PrivateRoutes } from "./PrivateRoutes"
import { DashBoard } from "../pages/Dashboard"

const RoutesMain = () => {
    return (
        <>
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<DashBoard />} />
            </Route>
        </Routes>
        </>
    )
}

export { RoutesMain }