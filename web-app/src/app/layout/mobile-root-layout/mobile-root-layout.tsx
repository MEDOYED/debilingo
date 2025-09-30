import { Outlet } from "react-router-dom";

import { Navigation } from "@/widgets/layout/navigation";

export const MobileRootLayout = () => {
    return (
        <div>
            <Outlet />
            <Navigation />
        </div>
    )
}