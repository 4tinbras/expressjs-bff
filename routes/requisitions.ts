import express, {type Request, type Response} from 'express';
import {myDataSource} from "../database/app-data-source";
import {Requisition} from "../persistence/entities";


try {
    // @ts-ignore
    await myDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization:", error)
}

const router = express.Router();


/* GET users listing. */
router.get('/requisitions', async function (req: Request, res: Response, next) {

    const results = await myDataSource.getRepository(Requisition).find()
    return res.json(results);
});

/* GET users listing. */
router.get('/requisition/id/:requisitionId', async function (req: Request<{
    requisitionId: number
}>, res: Response, next) {
    const result = await myDataSource.getRepository(Requisition).findOneBy({id: req.params.requisitionId})
    return res.json(result);

});

export default router;