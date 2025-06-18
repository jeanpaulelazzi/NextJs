import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService){}

// User login function
async findUser(username: string){
const user = await this.prisma.users.findUnique({
    where: {
      U_Username: username
    },
    
  });
  return user;
}



}