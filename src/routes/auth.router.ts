import { Request, Response, NextFunction, Router }  from "express";
import passport from "passport";
import * as authController from '../controllers/auth.controller'
const router = Router();


const wrapAsync = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}

router.post('/login', passport.authenticate('local', { session: false }), (req: any, res: Response, next: NextFunction) => {
    wrapAsync(authController.login(req, res, next));
})

export default router;
