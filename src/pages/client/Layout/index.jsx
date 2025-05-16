import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const UserLayout = () => {
    return (
        <>
            <Header />
            <div className="main-container">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default UserLayout;

