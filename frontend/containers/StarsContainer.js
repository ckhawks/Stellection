import { Outlet } from "react-router-dom"

const StarsContainer = () => {
    return (
        <div>
            <h1>Stars HERE</h1>
            <Outlet />
        </div>
    )
}

export default StarsContainer;