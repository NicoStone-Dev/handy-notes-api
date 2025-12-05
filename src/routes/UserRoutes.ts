import { Router } from "express";
import * as userController from '../controllers/UserController.js'

const UserRouter = Router();

UserRouter.get('/hello', (request, response) => {
    response.send('Hello, World!');
})

UserRouter.get('/list', userController.getAllUsers);
// Easily grabbing param values with :param
UserRouter.get(`/find/:id`, userController.findUser);
UserRouter.get('/list', userController.getAllUsers);

UserRouter.post('/create');

UserRouter.delete('/delete/:id', userController.deleteUser);

UserRouter.put('/update/:id', userController.updateUser);
    
export default UserRouter;