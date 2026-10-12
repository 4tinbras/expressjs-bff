import express, {type Request, type Response} from 'express';
import {PurchaseItem, PurchaseOrder} from "../models/warehouseTypes";

const router = express.Router();

const purchaseItem1: PurchaseItem = {
    partialPrice: 0,
    quantity: 1,
    stockId: 1,

    calculatePartialPrice(): number {
        return 0;
    }
}

const purchaseItem2: PurchaseItem = {
    partialPrice: 0,
    quantity: 1,
    stockId: 2,

    calculatePartialPrice(): number {
        return 0;
    }
}

const purchaseOrder1: PurchaseOrder = {
    transactionId: 1,
    madeOn: Date.now(),
    purchaseItems: [purchaseItem1, purchaseItem2],
    totalPrice: 0,

    calculateTotalPrice(): number {
        return 0;
    }
}

const purchaseOrder2: PurchaseOrder = {
    transactionId: 1,
    madeOn: Date.now(),
    purchaseItems: [purchaseItem1],
    totalPrice: 0,

    calculateTotalPrice(): number {
        return 0;
    }
}

/* GET users listing. */
router.get('/purchases', function (req: Request, res: Response, next) {

    res.send([purchaseOrder1, purchaseOrder2]);
});

/* GET users listing. */
router.get('/purchase/id/:purchaseId', function (req: Request<{ purchaseId: string }>, res: Response, next) {
    if (req.params.purchaseId === '1') {
        res.send(purchaseOrder1);
    } else if (req.params.purchaseId === '2') {
        res.send(purchaseOrder2);
    } else {
        res.status(404).send();
    }

});

export default router;