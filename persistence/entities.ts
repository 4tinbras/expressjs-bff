import {IPurchaseItem, IPurchaseOrder, IRequisition, IStockItem, IWarehouse} from "../models/warehouseTypes";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Warehouse implements IWarehouse {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "string"})
    name: string;
    @Column({type: "string"})
    location: string;
    @OneToMany(() => StockItem, stock => stock.warehouse)
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

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.availableStock)
    warehouse: IWarehouse;

    constructor(stockId: number, name: string, singleItemPrice: number, quantity: number, warehouse: IWarehouse) {
        this.stockId = stockId;
        this.name = name;
        this.singleItemPrice = singleItemPrice;
        this.quantity = quantity;
        this.warehouse = warehouse;
    }

}

export class PurchaseItem implements IPurchaseItem {
    stockId: number;
    quantity: number;
    partialPrice: number;

    @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.purchaseItems)
    purchaseOrder: IPurchaseOrder;

    constructor(stockId: number, quantity: number, purchaseOrder: IPurchaseOrder) {
        this.stockId = stockId;
        this.quantity = quantity;
        this.partialPrice = 0;
        this.purchaseOrder = purchaseOrder;
    }

    calculatePartialPrice(): number {
        return 0;
    }
}

export class PurchaseOrder implements IPurchaseOrder {
    transactionId: number;
    @OneToMany(() => PurchaseItem, (item) => item.purchaseOrder)
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