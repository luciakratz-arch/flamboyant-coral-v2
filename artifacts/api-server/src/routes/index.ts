import { Router, type IRouter } from "express";
import healthRouter from "./health";
import membersRouter from "./members";
import songsRouter from "./songs";
import eventsRouter from "./events";
import announcementsRouter from "./announcements";
import dashboardRouter from "./dashboard";
import settingsRouter from "./settings";
import studyMaterialsRouter from "./study-materials";
import eventAttendancesRouter from "./event-attendances";
import accessLogsRouter from "./access-logs";
import attendanceRouter from "./attendance";
import blogRouter from "./blog";

const router: IRouter = Router();

router.use(healthRouter);
router.use(membersRouter);
router.use(songsRouter);
router.use(eventsRouter);
router.use(eventAttendancesRouter);
router.use(announcementsRouter);
router.use(dashboardRouter);
router.use(settingsRouter);
router.use(studyMaterialsRouter);
router.use(accessLogsRouter);
router.use(attendanceRouter);
router.use(blogRouter);

export default router;
