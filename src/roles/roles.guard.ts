import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
   
    if (!requiredRoles) {
      return true; 
    }
    
    const { user } = context.switchToHttp().getRequest();
  
    
    if (!user || !user.role) return false;

    const hasRole = requiredRoles.some(role => user.role.includes(role));
    
    if (!hasRole) {
      throw new ForbiddenException('Access denied for this role');
    }

    return true;
  }
}
