import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/update-task.dto';
import { ResponseData } from 'src/services/helper';
import { TaskService } from 'src/services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('list')
  async getTaskList(@Body() queryParam:any) {
    const output = new ResponseData();
    try {
      output.data = await this.taskService.taskList(queryParam);
    } catch (error) {
      output.status = false;
      output.message = typeof error === 'string' ? error : '';
    }
    return output;
  }

  @Post('create-task')
  async addNewTask(@Body() createTaskDto: CreateTaskDto) {
    const output = new ResponseData();
    try {
      if (!createTaskDto) {
        throw 'Something went wrong';
      }

      const result = await this.taskService.createTask(createTaskDto);
      output.data = result.data;
      output.message = result.message;
    } catch (error) {
      output.status = false;
      output.message = typeof error === 'string' ? error : '';
    }
    return output;
  }

  @Patch('update-task/:id')
  async updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    const output = new ResponseData();
    try {
      if (!taskId) {
        throw 'Invalid param';
      }
      const result = await this.taskService.updateTask(updateTaskDto, taskId);
      output.data = result.data;
      output.message = result.message;
    } catch (error) {
      output.status = false;
      output.message = typeof error === 'string' ? error : '';
    }
    return output;
  }

  @Delete(':id')
  async removeTask(@Param('id',ParseIntPipe) taskId:number){
    const output = new ResponseData();
    try{
        if(!taskId){
            throw 'Something went wrong';
        }
        const result = await this.taskService.deleteTask(taskId);
        output.data = result.data;
        output.message = result.message;
    }catch(error){
        output.status = false;
        output.message = typeof error === 'string' ? error : "";
    }
    return output;
  }
}
