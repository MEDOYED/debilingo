import { Outlet } from "react-router-dom";

import { Navigation } from "@/widgets/layout/navigation";

import s from "./desktop-root-layout.module.scss"

export const DesktopRootLayout = () => {
    return (
        <div>
            <Navigation />

            <div className={s.outletWrapper}>
                <Outlet />
            </div>
        </div>
    )
}