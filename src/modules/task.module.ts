import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TaskController } from "src/controller/task.controller";
import { Task } from "src/models/task.model";
import { TaskService } from "src/services/task.service";

@Module({
    imports:[
        SequelizeModule.forFeature([
            Task,
        ])
    ],
    controllers:[TaskController],
    providers:[TaskService],
    exports:[SequelizeModule],
})
export class TaskModule {}