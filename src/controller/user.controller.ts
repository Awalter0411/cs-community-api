import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { createUser, findUserByName } from '../service/user.service.js'
import response from '../app/response.js';
import config from '../app/config.js';

export async function registerController(req: Request, res: Response) {
    const { username, password, email, phone } = req.body;
    const result = await createUser({
        username,
        password,
        email,
        phone
    })
    res.json(response.Success(_.omit(result, ['password'])))
}

export async function loginController(req: Request, res: Response) {
    // TODO: encrypt password and verify password about user
    const { username } = req.body
    const result = await findUserByName(username)
    console.log(result?.id, result?.username)
    const token =
        "Bearer " +
        jwt.sign(
            {
                id: result?.id,
                username: result?.username,
            },
            config.SECRET,
            {
                expiresIn: 3600 * 24 * 3,
            }
        );
    res.json(response.Success({ ..._.omit(result, ['password']), token }))
}
