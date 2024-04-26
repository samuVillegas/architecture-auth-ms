import {Router} from "express";
import {Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CreateLink, GetLink, Links, Stats} from "./controller/link.controller";
import {ConfirmOrder, CreateOrder, Orders} from "./controller/order.controller";


export const routes = (router: Router) => {
    router.put('/api/admin/users/password',  UpdatePassword);
    router.put('/api/admin/users/info',  UpdateInfo);
    // admin auth
    router.post('/api/admin/register', Register);
    router.post('/api/admin/login', Login);
    router.post('/api/admin/logout',  Logout);
    // auth
    router.post('/api/ambassador/register', Register);
    router.post('/api/ambassador/login', Login);
    router.post('/api/ambassador/logout',  Logout);
    router.put('/api/ambassador/users/info',  UpdateInfo);
    router.put('/api/ambassador/users/password',  UpdatePassword);
}
