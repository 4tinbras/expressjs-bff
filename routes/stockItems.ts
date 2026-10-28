import express, {type Request, type Response} from 'express';
import {myDataSource} from "../database/app-data-source";
import {StockItem} from "../persistence/entities";

try {
    // @ts-ignore
    await myDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization:", error)
}

const router = express.Router();


/* GET users listing. */
router.get('/stock-items', async function (req: Request, res: Response, next) {

    const results = await myDataSource.getRepository(StockItem).find()
    return res.json(results);
});

/* GET users listing. */
router.get('/stock-item/id/:itemId', async function (req: Request<{ itemId: number }>, res: Response, next) {
    const result = await myDataSource.getRepository(StockItem).findOneBy({id: req.params.itemId})
    return res.json(result);

});

export default router;