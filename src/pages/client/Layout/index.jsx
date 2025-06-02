import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { CartDrawer } from "../../../components";
import { WishlistModal } from "../../../components/common";

const UserLayout = () => {
    return (
        <>
            <div className="home-container">
                <Header />
                <CartDrawer/>
                <WishlistModal/>
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default UserLayout;

