export class UpdateDiscountCommand {
    id: string;
    name: string;
    percentage: number;

    constructor(id: string, name: string, percentage: number) {
        this.id = id;
        this.name = name;
        this.percentage = percentage;
    }
  }
  