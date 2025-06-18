import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/publicRoutes';
import { constants } from 'buffer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector){}
  async canActivate(context: ExecutionContext): Promise<boolean>  {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
      context.getHandler(),
      context.getClass()
    ])
    
    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);
    if(!token){
      throw new BadRequestException(' No token, Unauthorized!!!')
    }
    try{
      const payload = await this.jwtService.verifyAsync(token,{secret:jwtConstants.secret})
      request['user'] = payload;
    }catch(err){
    console.log(err.message)
    throw new BadRequestException('Unauthorized !!!')
  }
    return true;
  }


   private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  
}
