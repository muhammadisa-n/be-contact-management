import express from "express";
import userControiller from "../controllers/user-controiller.js";
import contactController from "../controllers/contact-controller.js";
import addressController from "../controllers/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
const userRouter = new express.Router();
// userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", authMiddleware, userControiller.get);
userRouter.patch("/api/users/current", authMiddleware, userControiller.update);
userRouter.delete("/api/users/logout", authMiddleware, userControiller.logout);

//Contact Api
userRouter.post("/api/contacts", authMiddleware, contactController.create);
userRouter.get(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.get
);
userRouter.put(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.update
);
userRouter.delete(
  "/api/contacts/:contactId",
  authMiddleware,
  contactController.remove
);
userRouter.get("/api/contacts", authMiddleware, contactController.search);

// Addrwss Api
userRouter.post(
  "/api/contacts/:contactId/addresses",
  authMiddleware,
  addressController.create
);
userRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.get
);
userRouter.put(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.update
);
userRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  authMiddleware,
  addressController.remove
);
userRouter.get(
  "/api/contacts/:contactId/addresses",
  authMiddleware,
  addressController.list
);

export { userRouter };
