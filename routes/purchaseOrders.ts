import express, {type Request, type Response} from 'express';
import {myDataSource} from "../database/app-data-source";
import {PurchaseOrder} from "../persistence/entities";

try {
    // @ts-ignore
    await myDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization:", error)
}

const router = express.Router();

/* GET users listing. */
router.get('/purchases', async function (req: Request, res: Response, next) {

    const results = await myDataSource.getRepository(PurchaseOrder).find()
    return res.json(results);
});

/* GET users listing. */
router.get('/purchase/id/:purchaseId', async function (req: Request<{ purchaseId: number }>, res: Response, next) {
    const result = await myDataSource.getRepository(PurchaseOrder).findOneBy({transactionId: req.params.purchaseId})
    return res.json(result);

});

export default router;