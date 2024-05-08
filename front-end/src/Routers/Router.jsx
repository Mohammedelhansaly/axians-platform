import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FullLayout from "../components/fullLayout/FullLayout";
import ListeProject from "../views/Projects/ListProjects/ListeProject";
import ListEquipement from "../views/Equipements/ListEquipement/ListEquipement";
import Profile from "../views/ProfileUser/Profile/Profile";
import EditProfile from "../views/ProfileUser/editProfile/EditProfile";
import Role from "../views/Role/Role";
import UserLogin from "../views/Auth/UserLogin";
import UserRegister from "../views/Auth/UserRegister";
import AdminLogin from "../views/Auth/AdminLogin";
import Dashboard from "../views/Admin/Dashboard/Dashboard";
import AuthUser from "../api/AuthUser";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NotFound from "../views/NotFoud/NotFound";
import EditPassword from "../views/ProfileUser/editpassword/EditPassword";
import SessionExpired from "../views/sessionExpired/SessionExpired";

// const ThemeRoutes = [
//     {
//         path: "/role",
//         element: <Role />
//     },
//     {
//         path: '/user/login',
//         element: <UserLogin />
//     },
//     {
//         path: '/user/register',
//         element: <UserRegister />
//     },
//     {
//         path: '/admin/login',
//         element: <AdminLogin />
//     },
//     {
//         path: "/",
//         element: <FullLayout />,
//         children: [
//             {
//                 path: "/",
//                 element: <Navigate to={'/MesProjets'} />
//             },
//             {
//                 path: "/MesProjets",
//                 element: <ListeProject />
//             },
//             {
//                 path: '/ListeEquipements/:id',
//                 element: <ListEquipement />
//             },
//             {
//                 path: '/profile',
//                 element: <Profile />
//             },
//             {
//                 path: '/EditProfile',
//                 element: <EditProfile />
//             },

//             {
//                 path: '/dashboard',
//                 element: <Dashboard />,

//             }


//         ]
//     }
// ]

const Router = () => {
    const { AdmingetToken } = AuthUser()
    return (
        <>
            <Routes>
                {/* Authentication Routes */}
                <Route path="/role" element={<Role />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/sessionExpired" element={<SessionExpired />} />

                {/* Common Layout for Other Routes */}
                <Route path="/" element={<FullLayout />}>
                    <Route path="/" element={<Navigate to="/MesProjets" />} />
                    <Route path="/MesProjets" element={<ListeProject />} />
                    <Route path="/ListeEquipements/:id" element={<ListEquipement />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/EditProfile" element={<EditProfile />} />
                    <Route path="/Editpassword" element={<EditPassword />} />

                    <Route path="/dashboard" element={AdmingetToken() ? <Dashboard /> : <Navigate to={'*'} />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router

