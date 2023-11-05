import express from "express"
import userControiller from "../controllers/user-controiller.js"
import contactController from "../controllers/contact-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js"
const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get("/api/users/current", userControiller.get)
userRouter.patch("/api/users/current", userControiller.update)
userRouter.delete("/api/users/logout", userControiller.logout)

//Contact Api
userRouter.post("/api/contacts", contactController.create)
userRouter.get("/api/contacts/:contactId", contactController.get)
userRouter.patch("/api/contacts/:contactId", contactController.update)
userRouter.delete("/api/contacts/:contactId", contactController.remove)
userRouter.get("/api/contacts", contactController.search)

export { userRouter }
