import express, {NextFunction, Request, Response } from "express";
import log4js from "log4js";

const router = express.Router();

//Create a logger for the file 'add.ts'
const debug = log4js.getLogger('add.ts');

// /api/add/
router.route("/")
    .all((req: Request, res: Response, next: NextFunction) => {
        debug.info('add route hit');
        next();
    }).get((req: Request, res: Response) => {
        //get the two numbers from the query string
        //NOTE: req.QUERY.VARNAME
        let op1 = req.query.op1?.toString() ?? '0';
        let op2 = req.query.op2?.toString() ?? '0';

        //remove any non-numeric characters
        op1 = op1.replace(/[^0-9]/g, '');
        op2 = op2.replace(/[^0-9]/g, '');

        //parse the two numbers convert to 'number'
        let num1 = parseInt(op1);
        let num2 = parseInt(op2);

        if (num1 < 0 || num2 < 0){
            debug.error(`Invalid input: 1:${num1}, 2:${num2}`);
            res.status(400).send('Invalid input');
        }

        //return the sum of the two numbers
        res.status(200).send({result: (num1 + num2)});
    }).put((req: Request, res: Response) => {
        const { num1, num2 } = req.body;
        res.status(200).send({result: (num1 + num2)});
    });
    
router.route('/:num1/:num2')
    .get((req: Request, res: Response) => {
        //get the two numbers from the query string
        //NOTE: req.PARAMS.VARNAME
        let op1 = req.params.num1 ?? '0';
        let op2 = req.params.num2 ?? '0';

        //remove any non-numeric characters
        op1 = op1.replace(/[^0-9]/g, '');
        op2 = op2.replace(/[^0-9]/g, '');

        //parse the two numbers convert to 'number'
        let num1 = parseInt(op1);
        let num2 = parseInt(op2);

        if (num1 < 0 || num2 < 0){
            debug.error(`Invalid input: 1:${num1}, 2:${num2}`);
            res.status(400).send('Invalid input');
        }

        //return the sum of the two numbers
        res.status(200).send({result: (num1 + num2).toString()});
    });



export default router;