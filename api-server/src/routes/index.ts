import { Router, type IRouter } from "express";
import healthRouter from "./health";
import attractionsRouter from "./attractions";
import packagesRouter from "./packages";
import transportationRouter from "./transportation";
import bookingsRouter from "./bookings";
import reviewsRouter from "./reviews";
import usersRouter from "./users";
import merchantsRouter from "./merchants";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(attractionsRouter);
router.use(packagesRouter);
router.use(transportationRouter);
router.use(bookingsRouter);
router.use(reviewsRouter);
router.use(usersRouter);
router.use(merchantsRouter);
router.use(adminRouter);

export default router;
