import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    taskName: string;

    @IsString()
    @IsOptional()
    taskDescription:string;

    @IsString()
    tags:string;

    @IsString()
    dueDate:string;

    @IsBoolean()
    @IsOptional()
    isCompleted: boolean;

    @IsString()
    @IsOptional()
    completedOn: string;
}