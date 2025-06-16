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

@Module({
  imports:[
    PatientModule,
    JwtModule.register({
      global : true,
      secret : jwtConstants.secret,
      signOptions:{expiresIn: '1h'}
    }),
  ],
  providers: [Authservice,PatientService,PrismaService,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
