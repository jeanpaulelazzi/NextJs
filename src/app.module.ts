import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { DepartmentsModule } from './departments/departments.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth/auth.module';
import { Authservice } from './auth/auth/auth.service';
import { PatientService } from './patient/patient.service';

@Module({
  imports: [DoctorModule, PatientModule, DepartmentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,Authservice,PatientService,PrismaService],
})
export class AppModule {}
