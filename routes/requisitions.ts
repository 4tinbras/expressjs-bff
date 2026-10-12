import express, {type Request, type Response} from 'express';
import {Requisition} from "../models/warehouseTypes";

const router = express.Router();

const requisition1: Requisition = {
    fulfilledOn: Date.now(),
    id: 1,
    requestedStock: [],
    totalValue: 0

}

const requisition2: Requisition = {
    fulfilledOn: Date.now(),
    id: 2,
    requestedStock: [],
    totalValue: 0

}

/* GET users listing. */
router.get('/requisitions', function (req: Request, res: Response, next) {

    res.json([requisition1, requisition2]);
});

/* GET users listing. */
router.get('/requisition/id/:requisitionId', function (req: Request<{ requisitionId: string }>, res: Response, next) {
    if (req.params.requisitionId === '1') {
        res.json(requisition1);
    } else if (req.params.requisitionId === '2') {
        res.json(requisition2);
    } else {
        res.status(404).send();
    }

});

export default router;