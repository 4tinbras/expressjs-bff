import {beforeAll, describe, expect, test} from 'vitest'
import app from "../app";
import http from "http";
// import express, { type Express, type Request, type Response } from 'express';

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
    });
});