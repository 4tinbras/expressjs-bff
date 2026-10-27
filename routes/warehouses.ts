import "reflect-metadata"

import express, {type Request, type Response} from 'express';
import {myDataSource} from "../database/app-data-source"
import {Warehouse} from "../persistence/entities";

try {
    // @ts-ignore
    await myDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization:", error)
}

const router = express.Router();



/* GET users listing. */
router.get('/warehouses', async function (req: Request, res: Response, next) {

    const results = await myDataSource.getRepository(Warehouse).find()
    return res.json(results);
});

/* GET users listing. */
router.get('/warehouse/id/:warehouseId', async function (req: Request<{ warehouseId: number }>, res: Response, next) {

    const result = await myDataSource.getRepository(Warehouse).findOneBy({id: req.params.warehouseId})
    return res.json(result);

});

export default router;