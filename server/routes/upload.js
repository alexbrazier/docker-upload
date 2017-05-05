import express from 'express';
import validate from 'express-validation';
import uploadValidation from '../validation/upload';
import uploadCtrl from '../controllers/upload';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(validate(uploadValidation), uploadCtrl.add);

export default router;
