enum WarehouseTypesDiscriminator {
    StockItem = 'StockItem',
}

export interface Warehouse {
    id: number;
    name: string;
    location: string;
    availableStock: StockItem[];

    requestSupplies(): Requisition;

    acceptPurchase(): PurchaseOrder;
}

export interface StockItem {
    readonly discriminator?: WarehouseTypesDiscriminator.StockItem;
    stockId: number;
    name: string;
    singleItemPrice: number;
    quantity: number;
}

export interface PurchaseItem {
    stockId: number;
    quantity: number;
    partialPrice: number;

    calculatePartialPrice(): number;
}

export interface PurchaseOrder {
    transactionId: number;
    purchaseItems: PurchaseItem[];
    totalPrice: number;
    madeOn: number;

    calculateTotalPrice(): number;
}

export interface Requisition {
    id: number;
    requestedStock: StockItem[];
    totalValue: number;
    fulfilledOn: number;
}