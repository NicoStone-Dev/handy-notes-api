import { Router } from "express";
import * as userProfileController from '../controllers/UserProfileController.js';
import { requireAuthentication } from "../controllers/middleware/AuthenticationMW.js";

const UserRouter = Router();

UserRouter.get('/hello', (request, response) => {
    response.send('Hello, World!');
});

UserRouter.delete('/delete/', requireAuthentication, userProfileController.deleteUserProfile);

UserRouter.put('/update/username/', requireAuthentication, userProfileController.updateUsername);

UserRouter.put('/update/email/', requireAuthentication, userProfileController.updateEmail);

export default UserRouter;