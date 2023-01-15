import { Request, Response } from 'express';
import { Request as JwtRequest } from 'express-jwt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { createUserService, cryptoPassword, deleteUserService, findAllUserListService, findUserByIdService, findUserByNameService, updateUserService } from '../service/user.service.js'
import response from '../app/response.js';
import config from '../app/config.js';
import { UserRole } from '../entity/user.entity.js';

export async function register(req: Request, res: Response) {
    const { username, password, email, phone } = req.body;
    const result = await createUserService({
        username,
        password,
        email,
        phone,
        role: UserRole.USER
    })
    if (!(result instanceof Array)) {
        res.json(response.Success(_.omit(result, ['password', 'isDelete']), '注册成功'))
    } else {
        res.json(response.Error(result[1] as string))
    }
}

export async function createUser(req: Request, res: Response) {
    const { username, password, email, phone, role } = req.body;
    const result = await createUserService({
        username,
        password,
        email,
        phone,
        role
    })
    if (!(result instanceof Array)) {
        res.json(response.Success(_.omit(result, ['password', 'isDelete']), '创建成功'))
    } else {
        res.json(response.Error(result[1] as string))
    }
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body
    const user = await findUserByNameService(username)
    if (!user) {
        res.json(response.NotFound('用户不存在'))
    }
    if (!(user?.password === (await cryptoPassword(password)))) {
        res.json(response.Error('用户密码错误'))
        return
    }
    const token =
        "Bearer " +
        jwt.sign(
            {
                id: user?.id,
                username: user?.username,
                role: user?.role
            },
            config.SECRET,
            {
                expiresIn: 3600 * 24 * 3,
            }
        );
    res.json(response.Success({ ..._.omit(user, ['password', 'isDelete']), token }, '登录成功'))
}

export async function findAllUserList(req: JwtRequest, res: Response) {
    const result = await findAllUserListService()
    res.json(response.Success({ list: result[0], count: result[1] }))
}

// todo
export async function updateUser(req: JwtRequest, res: Response) {
    await updateUserService({ ...req.body, password: parseInt(req.body.password) })
    res.json(response.Success())
}

export async function findUserById(req: JwtRequest, res: Response) {
    const id = parseInt(req.params.id)
    const result = await findUserByIdService(id)
    res.json(response.Success(result))
}

export async function findUserInfo(req: JwtRequest, res: Response) {
    const id = req.auth?.id as number
    const result = await findUserByIdService(id)
    res.json(response.Success(_.omit(result, ['password'])))
}


export async function deleteUser(req: JwtRequest, res: Response) {
    const id = parseInt(req.params.id)
    const result = await deleteUserService(id)
    res.json(response.Success(_, '删除成功'))
}
