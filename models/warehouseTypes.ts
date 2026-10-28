enum WarehouseTypesDiscriminator {
    StockItem = 'StockItem',
}

export interface IWarehouse {
    id: number;
    name: string;
    location: string;
    availableStock: IStockItem[];

    requestSupplies(): IRequisition;

    acceptPurchase(): IPurchaseOrder;
}

export interface IStockItem {
    readonly discriminator?: WarehouseTypesDiscriminator.StockItem;
    stockId: number;
    name: string;
    singleItemPrice: number;
    quantity: number;
}

export interface IPurchaseItem {
    stockId: number;
    quantity: number;
    partialPrice: number;

    calculatePartialPrice(): number;
}

export interface IPurchaseOrder {
    transactionId: number;
    purchaseItems: IPurchaseItem[];
    totalPrice: number;
    madeOn: number;

    calculateTotalPrice(): number;
}

export interface IRequisition {
    id: number;
    requestedStock: IStockItem[];
    totalValue: number;
    fulfilledOn: number;
}