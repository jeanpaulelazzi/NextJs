
import { Injectable,BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class Authservice{

constructor (
  private users : UsersService,
  private jwtService: JwtService,


){}


async signIn(username: string, pass: string) : Promise<any>{

  const user = await this.users.findUser(username);
  
  
  if(!user){
    throw new BadRequestException(" User not found")
  }

  const hashedPass = await bcrypt.compareSync(pass,user?.U_Password)
  if(!hashedPass){
    throw new BadRequestException("incorrect Username/ Password");
  }

  
  const payload = {sub: user.U_ID,username: user.U_Username, role: user.U_isAdmin}

  return{
   access_token: await this.jwtService.signAsync(payload)
  }
}


async getAllProfiles(username){
  const user = await this.users.findUser(username)
  return user
}

}

