import { Router } from "express";
import * as userController from '../controllers/UserController.js';
import { requireAuthentication } from "../controllers/middleware/AuthenticationMW.js";

const UserRouter = Router();

UserRouter.get('/hello', (request, response) => {
    response.send('Hello, World!');
});

// Gotta define public, protected and user defined routes.
// Easily grabbing param values with :param

// UserRouter.post('/register');

// UserRouter.post('/profile/:userCode');

UserRouter.delete('/delete/:id', requireAuthentication, userController.deleteUser);

UserRouter.put('/update/:id', requireAuthentication, userController.updateUser);

export default UserRouter;