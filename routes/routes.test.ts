import {beforeAll, describe, expect, test} from 'vitest'
import app from "../app";
import http from "http";
import {IPurchaseOrder, IRequisition, IStockItem, IWarehouse, Requisition} from "../models/warehouseTypes";
import {PurchaseItem, PurchaseOrder, StockItem, Warehouse} from "../persistence/entities";
import {MockTypeORM} from 'mock-typeorm'
import type {Response} from "express";

describe('Index page controller ', () => {
    let response: Response;
    let body: Array<{ [key: string]: unknown }>;

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3030);
        const server = http.createServer(serv);
        server.listen(3030);

        const url = `http://localhost:3030/`;
        response = await fetch(url);
        // @ts-ignore
        body = await response.text();
    }, 3000);

    test('Should have response status 200', () => {
        expect(response.status).toBe(200);
    });

    test('Should have html content', () => {
        expect(body).toContain("<!DOCTYPE html>");
    });
});

describe('Users page controller ', () => {
    let response: Response;
    let body: Array<{ [key: string]: unknown }>;

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3040);
        const server = http.createServer(serv);
        server.listen(3040);

        const url = `http://localhost:3040/users`;
        response = await fetch(url);
        // @ts-ignore
        body = await response.text();
    }, 3000);

    test('Should have response status 200', () => {
        expect(response.status).toBe(200);
    });

    test('Should have non-html content', () => {
        expect(body).toContain('respond with a resource');
        expect(body).not.toContain("<!DOCTYPE html>");
    });
});

describe('Warehouse page controller ', () => {
    let response: Response;

    const warehousesUrl = `http://localhost:3050/warehouses`;
    const warehouseUrlPrefix = `http://localhost:3050/warehouse/id/`;

    const warehouse1: Warehouse = {
        availableStock: [],
        id: 1,
        location: "",
        name: "",
    }
    const warehouse2: Warehouse = {
        availableStock: [],
        id: 2,
        location: "",
        name: "",
    }

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3050);
        const server = http.createServer(serv);
        server.listen(3050);

        const ormMock = new MockTypeORM();
        ormMock.onMock('Warehouse').toReturn([warehouse1, warehouse2], 'find');
        ormMock.onMock('Warehouse').toReturn(warehouse1, 'findOneBy');

    }, 3000);

    test('When GET request to warehouses' +
        'should have response status 200' +
        'and contain list of warehouses', async () => {
        response = await fetch(warehousesUrl);
        const body: IWarehouse[] = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toEqual(2);
        expect(body).toEqual([warehouse1, warehouse2]);
    });

    test('When GET request to warehouses' +
        'should return 200' +
        'and relevant record', async () => {
        response = await fetch(warehouseUrlPrefix + '1');
        const body: IWarehouse = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual(warehouse1);
    });
});

describe('Requisitions page controller ', () => {
    let response: Response;
    const requisitionsUrl = `http://localhost:3060/requisitions`;
    const requisitionUrlPrefix = `http://localhost:3060/requisition/id/`;

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

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3060);
        const server = http.createServer(serv);
        server.listen(3060);

        const ormMock = new MockTypeORM();
        ormMock.onMock('Requisition').toReturn([requisition1, requisition2], 'find');
        ormMock.onMock('Requisition').toReturn(requisition1, 'findOneBy');

    }, 3000);

    test('When GET request to requisitions' +
        'should have response status 200' +
        'and contain list of warehouses', async () => {
        response = await fetch(requisitionsUrl);
        const body: IRequisition[] = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual([requisition1, requisition2]);

    });

    test('When GET request to requisition' +
        'should return 200' +
        'and relevant record', async () => {
        response = await fetch(requisitionUrlPrefix + '1');
        const body: IRequisition = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual(requisition1);
    });
});

describe('Stock item', () => {
    let response: Response;
    const stockItemsUrl = `http://localhost:3070/stock-items`;
    const stockItemUrlPrefix = `http://localhost:3070/stock-item/id/`;

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

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3070);
        const server = http.createServer(serv);
        server.listen(3070);

        const ormMock = new MockTypeORM();
        ormMock.onMock('StockItem').toReturn([stockItem1, stockItem2], 'find');
        ormMock.onMock('StockItem').toReturn(stockItem1, 'findOneBy');

    }, 3000);

    test('When GET request to stockItems' +
        'should have response status 200' +
        'and contain list of items', async () => {
        response = await fetch(stockItemsUrl);
        const body: IStockItem[] = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual([stockItem1, stockItem2]);
    });

    test('When GET request to stockItem' +
        'should have response status 200' +
        'and contain valid record', async () => {
        response = await fetch(stockItemUrlPrefix + '1');
        const body: IStockItem = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual(stockItem1);
    });
});

describe('Purchases page controller ', () => {
    let response: Response;
    const purchasesUrl = `http://localhost:3080/purchases`;
    const purchaseUrlPrefix = `http://localhost:3080/purchase/id/`;

    const purchaseItem1: PurchaseItem = {
        partialPrice: 0,
        quantity: 1,
        stockId: 1,
    }

    const purchaseItem2: PurchaseItem = {
        partialPrice: 0,
        quantity: 1,
        stockId: 2,
    }

    const purchaseOrder1: PurchaseOrder = {
        transactionId: 1,
        madeOn: Date.now(),
        purchaseItems: [purchaseItem1, purchaseItem2],
        totalPrice: 0,
    }

    const purchaseOrder2: PurchaseOrder = {
        transactionId: 1,
        madeOn: Date.now(),
        purchaseItems: [purchaseItem1],
        totalPrice: 0,
    }

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3080);
        const server = http.createServer(serv);
        server.listen(3080);

        const ormMock = new MockTypeORM();
        ormMock.onMock('PurchaseOrder').toReturn([purchaseOrder1, purchaseOrder2], 'find');
        ormMock.onMock('PurchaseOrder').toReturn(purchaseOrder1, 'findOneBy');

    }, 3000);

    test('When GET request to purchaseOrders' +
        'should have response status 200' +
        'and contain list of items', async () => {
        response = await fetch(purchasesUrl);
        const body: IPurchaseOrder[] = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual([purchaseOrder1, purchaseOrder2]);
    });

    test('When GET request to purchaseOrder' +
        'should have response status 200' +
        'and contain relevant record', async () => {
        response = await fetch(purchaseUrlPrefix + '1');
        const body: IPurchaseOrder = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual(purchaseOrder1);
    });
});