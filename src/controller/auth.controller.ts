import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {UserDetail} from "../entity/user.entity";
import bcryptjs from 'bcryptjs';
import {sign} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const {password, ...body} = req.body;

    const user = await getRepository(UserDetail).save({
        ...body,
        password: await bcryptjs.hash(password, 10)
    });

    delete user.password;
    res.send(user);
}

export const Login = async (req: Request, res: Response) => {
    const user = await getRepository(UserDetail).findOne({email: req.body.email}, {
        select: ["id", "password", "is_ambassador"]
    });

    if (!user) {
        return res.status(400).send({
            message: 'invalid credentials!'
        });
    }

    if (!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials!'
        });
    }

    const adminLogin = req.path === '/api/admin/login';

    if (user.is_ambassador && adminLogin) {
        return res.status(401).send({
            message: 'unauthorized'
        });
    }

    const token = sign({
        id: user.id,
        scope: adminLogin ? "admin" : "ambassador"
    }, process.env.SECRET_KEY);

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000//1 day
    })

    res.send({
        message: 'success'
    });
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", {maxAge: 0});

    res.send({
        message: 'success'
    });
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req["user"];

    const {email} = req.body;

    const repository = getRepository(UserDetail);

    await repository.update(user.id, {email});

    res.send(await repository.findOne(user.id));
}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req["user"];

    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match!"
        })
    }

    await getRepository(UserDetail).update(user.id, {
        password: await bcryptjs.hash(req.body.password, 10)
    });

    res.send(user);
}
