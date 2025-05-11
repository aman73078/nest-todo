import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Task extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id:number

    @Column({
        type: DataType.STRING
    })
    taskName:string

    @Column({
        type: DataType.TEXT
    })
    taskDescription:string

    @Column({
        type: DataType.STRING
    })
    dueDate:string

    @Column({
        type: DataType.BOOLEAN
    })
    isCompleted: boolean

    @Column({
        type: DataType.STRING
    })
    tags:string

    @Column({
        type: DataType.DATE
    })
    completedOn: Date
}