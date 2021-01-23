import { Request, Response, NextFunction, Router } from "express";
import { check, sanitizeBody, body } from "express-validator";
import passport from "passport";
import * as userController from "../controllers/user.controller";
const router = Router();
import {} from '../auth/auth.guards'
const  wrapAsync=(fn: any)=> {
  return (req: Request, res: Response, next: NextFunction) =>{
    fn(req, res, next).catch(next);
  };
}

router.post(
  "/",
  [
    // Check the form and validated it before submitting
    check("email", "Email is not valid").isEmail(),
    check("email").normalizeEmail({
      gmail_remove_subaddress: false, // correct
      outlookdotcom_remove_subaddress: false,
      gmail_remove_dots: false,
      icloud_remove_subaddress: false,
    }),

    body("password", "Password cannot be blank").not().isEmpty(),
    check("confirmPassword", "Confirmed Password cannot be blank!")
      .not()
      .isEmpty(),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
    check("g-recaptcha-response", "Please validate your Google reCAPTCHA")
      .not()
      .isEmpty(),
  ],
  (req: Request, res: Response) => {
    wrapAsync(userController.createUser(req, res));
  }
);
router.get(
  "/",
    (req: Request, res: Response) => {
    wrapAsync(userController.getUsersList(req, res));
  }
);
router.get(
  "/:id",
    (req: Request, res: Response) => {
    wrapAsync(userController.getOneUser(req, res));
  }
);

export default router;
