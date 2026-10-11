import {beforeAll, describe, it, expect, test, vi} from 'vitest'
import * as index from './index'
import router, {getHandler} from "./index";
import express from "express";
import app from "../app";
import http from "http";
import server from "../bin/www";
import path from "path";
import cookieParser from "cookie-parser";
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