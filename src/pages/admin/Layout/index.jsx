import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
            <div className=" flex-1">
                <Header />
                <div className="main-container p-10">
                    <Outlet />
                </div>
            </div>
            </div>
        </>
    );
};

export default AdminLayout;

