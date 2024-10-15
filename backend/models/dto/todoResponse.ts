import type { TodoStatusEnum } from "../enum/todoStatusEnum";

export class TodoSchemaResponse {
    title: String;
    description: String;
    status: TodoStatusEnum;
    createdAt:  Date;

    constructor (title: String, description: String, status: TodoStatusEnum, createdAt:  Date) {
      this.title = title;
      this.description = description;
      this.status = status;
      this.createdAt = createdAt;
    }
}