//Import express router
import express from 'express';
import add from './add';
import random from './random';
const router = express.Router();

router.use('/add', add);
router.use('/random', random);

export default router;