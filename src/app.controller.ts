import { Controller, Get ,Redirect,Request,Res, UseGuards} from '@nestjs/common';
import { Response } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  @Get()
  redirect(){
    return 'Homepage'
  }


  
  }

