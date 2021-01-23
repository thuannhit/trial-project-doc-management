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

router.get("/", authGuard.authenticateJWT,
    wrapAsync(DocumentController.getDoccuments)
);

router.get("/:id", authGuard.authenticateJWT,
    wrapAsync(DocumentController.getDoccument)
);

router.put("/:id", authGuard.authenticateJWT,
    wrapAsync(DocumentController.updateDocumentAllProperties)
);

router.patch("/:id", authGuard.authenticateJWT,
    wrapAsync(DocumentController.updateDocumentSomeProperties)
);

router.delete("/:id", authGuard.authenticateJWT,
    wrapAsync(DocumentController.deleteDocument)
);

export default router;
