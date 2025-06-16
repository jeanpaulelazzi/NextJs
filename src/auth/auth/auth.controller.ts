import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request,Get } from '@nestjs/common';
import { Authservice } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: Authservice){}


//@HttpCode(HttpStatus.OK)
// @UseGuards(AuthGuard)
@Post('login')
signIn(@Body() signInDto: {username: string, pass: string}){
return this.authService.signIn(signInDto.username, signInDto.pass)
}


@UseGuards(AuthGuard)
@Get('profile')
async getProfile(@Request() req){
    console.log(req)
    return await this.authService.getAllProfiles(req.user.username)
}
}
