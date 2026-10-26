import {IPurchaseItem, IPurchaseOrder, IRequisition, IStockItem, IWarehouse} from "../models/warehouseTypes";

export class Warehouse implements IWarehouse {
    id: number;
    name: string;
    location: string;
    availableStock: IStockItem[];

    constructor(id: number, name: string, location: string, availableStock: IStockItem[]) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.availableStock = availableStock;
    }

    requestSupplies(): IRequisition {
        return new Requisition(0, [], 0);
    }

    acceptPurchase(): IPurchaseOrder {
        return new PurchaseOrder(0, []);
    }
}

export class StockItem implements IStockItem {
    discriminator?: undefined;
    stockId: number;
    name: string;
    singleItemPrice: number;
    quantity: number;

    constructor(stockId: number, name: string, singleItemPrice: number, quantity: number) {
        this.stockId = stockId;
        this.name = name;
        this.singleItemPrice = singleItemPrice;
        this.quantity = quantity;
    }

}

export class PurchaseItem implements IPurchaseItem {
    stockId: number;
    quantity: number;
    partialPrice: number;

    constructor(stockId: number, quantity: number) {
        this.stockId = stockId;
        this.quantity = quantity;
        this.partialPrice = 0;
    }

    calculatePartialPrice(): number {
        return 0;
    }
}

export class PurchaseOrder implements IPurchaseOrder {
    transactionId: number;
    purchaseItems: PurchaseItem[];
    totalPrice: number;
    madeOn: number;

    constructor(transactionId: number, purchaseItems: PurchaseItem[]) {
        this.transactionId = transactionId;
        this.purchaseItems = purchaseItems;
        this.madeOn = Date.now();
        this.totalPrice = 0;
    }

    calculateTotalPrice(): number {
        return 0;
    }
}

export class Requisition implements IRequisition {
    id: number;
    requestedStock: StockItem[];
    totalValue: number;
    fulfilledOn: number;

    constructor(transactionId: number, requestedStock: StockItem[], totalValue: number) {
        this.id = transactionId;
        this.requestedStock = requestedStock;
        this.totalValue = totalValue;
        this.fulfilledOn = Date.now();
    }
}