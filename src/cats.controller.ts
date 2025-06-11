import {Controller,Get,HttpCode,Res} from '@nestjs/common'

@Controller('cats')
export class CatsController{
    @Get('breed')
    @HttpCode(200)
    
    findAll(@Res() response ): string{
        return 'This action returns all cats';
    }
}