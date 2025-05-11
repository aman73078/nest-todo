import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Task } from "src/models/task.model";
import { Result } from "./helper";
import { Op } from "sequelize";

@Injectable()
export class TaskService {
    private apiUrl :string = 'http://localhost:3005/'
    constructor(
        @InjectModel(Task) private readonly taskModel: typeof Task,
    ){}

    async createTask(param:any){
        const result = new Result();
        try{
            if(!param){
                throw 'Invalid param';
            }
            console.log(param,'param------->');
            
            const taskExist = await this.taskModel.findOne({
                where:{
                    taskName: param.taskName,
                    taskDescription: param.taskDescription
                }
            });

            if(taskExist){
                throw 'Already this task exits';
            }

            result.data = await this.taskModel.create(param);
            result.message = 'Task created successfully';
            console.log(result,'param------->');

            return result;
        }catch(error){
            console.log(error,'param------->');

            throw error;
        }
    }

    async taskList(queryParam: any) {
        const searchField = queryParam?.filter?.queryField ? queryParam?.filter?.queryField: '';
        const searchText = queryParam?.filter?.queryString ? queryParam?.filter?.queryString: '';
        
        const query: any = {
            where: {}
        };
    
        if (searchText) {
            const likeSearch = { [Op.like]: `%${searchText}%` };
    
            switch (searchField) {
                case 'taskName':
                    query.where = {
                        taskName: likeSearch
                    };
                    break;
                case 'dueDate':
                    query.where = {
                        dueDate: likeSearch
                    };
                    break;
                default:
                    query.where = {
                        [Op.or]: [
                            { taskName: likeSearch },
                            { dueDate: likeSearch }
                        ]
                    };
                    break;
            }
        }
    
        return await this.taskModel.findAndCountAll(query);
    }

    async deleteTask(taskId:number){
        const result = new Result();
        try{
            result.data = await this.taskModel.destroy({
                where:{
                    id: taskId
                }
            })
            result.message = 'Task deleted successfully';
            return result;
        }catch(error){
            throw error;
        }
    }

    async updateTask(param:any,taskId:number){
        const result = new Result();
        try{
            if(!param){
                throw 'Invalid Param';
            }
            result.data = await this.taskModel.update(param,{
                where:{
                    id: taskId
                }
            })
            result.message = 'Task updated successfully';
            return result;
        }catch(error){
            throw error;
        }
    }
}