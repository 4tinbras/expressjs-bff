import {beforeAll, describe, expect, test} from 'vitest'
import app from "../app";
import http from "http";
import {Requisition, Warehouse} from "../models/warehouseTypes";

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

    beforeAll(async () => {
        const serv = app;
        app.set('port', 3050);
        const server = http.createServer(serv);
        server.listen(3050);

    }, 3000);

    test('When GET request to warehouses' +
        'should have response status 200' +
        'and contain list of warehouses', async () => {
        response = await fetch(warehousesUrl);
        // @ts-ignore
        const body: Warehouse[] = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toEqual(2);
    });

    test('When GET request to warehouses' +
        'should return 200' +
        'and relevant record', async () => {
        response = await fetch(warehouseUrlPrefix + '1');
        // @ts-ignore
        const body: Warehouse = await response.json();

        expect(response.status).toBe(200);
        // expect(body).toContain('respond with a resource');
    });
});

describe('Requisitions page controller ', () => {
    let response: Response;
    const requisitionsUrl = `http://localhost:3060/requisitions`;
    const requisitionUrlPrefix = `http://localhost:3060/requisition/id/`;


    beforeAll(async () => {
        const serv = app;
        app.set('port', 3060);
        const server = http.createServer(serv);
        server.listen(3060);

    }, 3000);

    test('When GET request to requisitions' +
        'should have response status 200' +
        'and contain list of warehouses', async () => {
        response = await fetch(requisitionsUrl);
        // @ts-ignore
        const body: Requisition[] = await response.json();

        expect(response.status).toBe(200);
        // expect(body).toContain('respond with a resource');

    });

    test('When GET request to requisition' +
        'should return 200' +
        'and relevant record', async () => {
        response = await fetch(requisitionUrlPrefix + '1');
        // @ts-ignore
        const body: Requisition = await response.json();

        expect(response.status).toBe(200);
        // expect(body).toContain('respond with a resource');
    });
});
//
// describe('Users page controller ', () => {
//     let response: Response;
//     let body: Array<{ [key: string]: unknown }>;
//
//     beforeAll(async () => {
//         const serv = app;
//         app.set('port', 3040);
//         const server = http.createServer(serv);
//         server.listen(3040);
//
//         const url = `http://localhost:3040/users`;
//         response = await fetch(url);
//         // @ts-ignore
//         body = await response.text();
//     }, 3000);
//
//     test('Should have response status 200', () => {
//         expect(response.status).toBe(200);
//     });
//
//     test('Should have non-html content', () => {
//         expect(body).toContain('respond with a resource');
//     });
// });
//
// describe('Users page controller ', () => {
//     let response: Response;
//     let body: Array<{ [key: string]: unknown }>;
//
//     beforeAll(async () => {
//         const serv = app;
//         app.set('port', 3040);
//         const server = http.createServer(serv);
//         server.listen(3040);
//
//         const url = `http://localhost:3040/users`;
//         response = await fetch(url);
//         // @ts-ignore
//         body = await response.text();
//     }, 3000);
//
//     test('Should have response status 200', () => {
//         expect(response.status).toBe(200);
//     });
//
//     test('Should have non-html content', () => {
//         expect(body).toContain('respond with a resource');
//     });
// });