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
import { AdminModule } from './admin/admin.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DoctorModule, PatientModule, DepartmentsModule, AuthModule, AdminModule,UsersModule,UsersModule],
  controllers: [AppController],
  providers: [AppService,Authservice,PatientService,PrismaService, UsersService],
})
export class AppModule {}
