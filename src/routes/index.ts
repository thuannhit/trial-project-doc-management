import express from "express";
import userRouter  from './user.router'
import authRouter from './auth.router'
import docRouter from './document.router'

const router = express.Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/docs', docRouter)

export default router;
