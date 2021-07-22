export class State {
  constructor(
    private productId: number,
    private dateOfChange: string,
    private warehouseId: number,
    private amount: number
  ) {}

  getProductId() {
    return this.productId;
  }

  getDateOfChange() {
    return this.dateOfChange;
  }

  getWarehouseId() {
    return this.warehouseId;
  }

  getAmount() {
    return this.amount;
  }

  setDateOfChange(formattedDate: string) {
    this.dateOfChange = formattedDate;
  }
}
