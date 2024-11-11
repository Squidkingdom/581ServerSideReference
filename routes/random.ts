import express, {NextFunction, Request, Response } from "express";
import log4js from "log4js";
import { random } from "lodash";

const router = express.Router();

//Create a logger for the file 'random.ts' and set the type as any
// Extend the logger to add a custom 'fine' method
const logger = log4js.getLogger('random.ts');


router.all('/', (req: Request, res: Response, next: NextFunction) => {
        logger.log('FINE', 'random route hit');
        next();
    }).get('/', (req: Request, res: Response) => {
        //Get the max value from the query string
        //max can be a couple of different types, max? is a way to say max is optional, and run the toString() method on it if it exists
        // ?? is a way to say if the value is null or undefined, use the value after the ??
        let max = req.query.max?.toString() ?? '';
        
        if (parseInt(max) < 0)
            res.status(400).send('Invalid input');

        // Max is not defined
        else if (max === '')
            res.status(200).send(random(0, 100).toString());

        // Max is defined
        else
            res.status(200).send(random(0, parseInt(max)).toString());
    })


export default router;