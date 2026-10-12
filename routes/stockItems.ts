import express, {type Request, type Response} from 'express';
import {StockItem} from "../models/warehouseTypes";

const router = express.Router();

const stockItem1: StockItem = {
    name: "",
    quantity: 1,
    singleItemPrice: 1,
    stockId: 1
}

const stockItem2: StockItem = {
    name: "",
    quantity: 2,
    singleItemPrice: 2,
    stockId: 2
}

/* GET users listing. */
router.get('/stock-items', function (req: Request, res: Response, next) {

    res.json([stockItem1, stockItem2]);
});

/* GET users listing. */
router.get('/stock-item/id/:itemId', function (req: Request<{ itemId: string }>, res: Response, next) {
    if (req.params.itemId === '1') {
        res.json(stockItem1);
    } else if (req.params.itemId === '2') {
        res.json(stockItem2);
    } else {
        res.status(404).send();
    }

});

export default router;