export class CreateDiscountCommand {
    name: string;
    percentage: number;

    constructor(name: string, percentage: number) {
        this.name = name;
        this.percentage = percentage;
    }
  }
  