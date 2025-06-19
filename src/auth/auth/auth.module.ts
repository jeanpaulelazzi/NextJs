import { Module } from '@nestjs/common';
import { Authservice } from './auth.service';
import { PatientService } from 'src/patient/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientModule } from 'src/patient/patient.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports:[
    PatientModule,
    DoctorModule,
    JwtModule.register({
      global : true,
      secret : jwtConstants.secret,
      signOptions:{expiresIn: '1h'}
    }),
  ],
  providers: [Authservice,PrismaService,UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
