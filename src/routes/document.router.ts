import { Request, Response, NextFunction, Router } from "express";
import { check, sanitizeBody, body } from "express-validator";
import passport from "passport";
import * as DocumentController from "../controllers/doc.controller";
const router = Router();
import { AuthGuards } from "../auth/auth.guards";
const authGuard = new AuthGuards();
const wrapAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

router.post(
  "/",
  authGuard.authenticateJWT,
  wrapAsync(DocumentController.createNewDoc)
);
router.get("/", (req: Request, res: Response) => {
  wrapAsync(DocumentController.getUsersList(req, res));
});

export default router;
