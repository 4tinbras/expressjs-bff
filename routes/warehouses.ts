import express, {type Request, type Response} from 'express';
import {PurchaseOrder, Requisition, Warehouse} from "../models/warehouseTypes";

const router = express.Router();


const warehouse1: Warehouse = {
    availableStock: [],
    id: 1,
    location: "",
    name: "",

    acceptPurchase(): PurchaseOrder {
        // @ts-ignore
        return undefined;
    }, requestSupplies(): Requisition {
        // @ts-ignore
        return undefined;
    }

}
const warehouse2: Warehouse = {
    availableStock: [],
    id: 2,
    location: "",
    name: "",

    acceptPurchase(): PurchaseOrder {
        // @ts-ignore
        return undefined;
    }, requestSupplies(): Requisition {
        // @ts-ignore
        return undefined;
    }
}

/* GET users listing. */
router.get('/warehouses', function (req: Request, res: Response, next) {

    res.json([warehouse1, warehouse2]);
});

/* GET users listing. */
router.get('/warehouse/id/:warehouseId', function (req: Request<{ warehouseId: string }>, res: Response, next) {
    if (req.params.warehouseId === '1') {
        res.json(warehouse1);
    } else if (req.params.warehouseId === '2') {
        res.json(warehouse1);
    } else {
        res.status(404).json();
    }

});

export default router;