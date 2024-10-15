export enum TodoStatusEnum{
    planejado,
    fazendo,
    concluído
}
export class TodoStatus {
    getEnumByString(name: String){
        return TodoStatusEnum[name as keyof typeof TodoStatusEnum];
    }
}