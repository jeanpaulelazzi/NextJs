
import { Injectable, CanActivate, ExecutionContext, Dependencies, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { PatientService } from 'src/patient/patient.service';
import { Roles } from 'src/roles/roles.decorator';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class Authservice{

constructor (
  private patientService : PatientService,
  private jwtService: JwtService,


){}


async signIn(username: string, pass: string) : Promise<any>{
  const patient = await this.patientService.findPatient(username);
  
  if(!patient){
    throw new BadRequestException(" User not found")
  }

  const hashedPass = await bcrypt.compareSync(pass,patient?.P_Password)
  if(!hashedPass){
    throw new BadRequestException("incorrect Username/ Password");
  }

  
  const payload = {sub: patient.P_ID,username: patient.P_Username}

  return{
   access_token: await this.jwtService.signAsync(payload)
  }
}


async getAllProfiles(username){
  const patient = await this.patientService.findPatient(username)
  return patient

}

}

