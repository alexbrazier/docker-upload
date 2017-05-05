import express from 'express';
import uploadRoutes from './upload';

const router = express.Router(); // eslint-disable-line new-cap

router.use('/upload', uploadRoutes);

export default router;
