import { Request, Response } from 'express';
import { Request as JwtRequest } from 'express-jwt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { createUser, cryptoPassword, findAllUserListService, findUserByIdService, findUserByNameService, updateUserService } from '../service/user.service.js'
import response from '../app/response.js';
import config from '../app/config.js';

export async function register(req: Request, res: Response) {
    const { username, password, email, phone } = req.body;
    const result = await createUser({
        username,
        password,
        email,
        phone,
    })
    if (!(result instanceof Array)) {
        res.json(response.Success(_.omit(result, ['password', 'isDelete']), '注册成功'))
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
    const pageNum = parseInt(req.query.pageNum as string)
    const pageSize = parseInt(req.query.pageSize as string)
    const result = await findAllUserListService(pageNum, pageSize)
    res.json(response.Success(result))
}

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
