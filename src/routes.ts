import {Router} from "express";
import {Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";

export const routes = (router: Router) => {
    router.put('/api/admin/users/password',  UpdatePassword);
    router.put('/api/admin/users/info',  UpdateInfo);
    // admin auth
    router.post('/api/admin/login', Login);
    router.post('/api/admin/logout',  Logout);
    // auth
    router.post('/api/auth/register', Register);
    router.post('/api/ambassador/login', Login);
    router.post('/api/ambassador/logout',  Logout);
    router.put('/api/ambassador/users/info',  UpdateInfo);
    router.put('/api/ambassador/users/password',  UpdatePassword);
}
