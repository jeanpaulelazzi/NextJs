import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin';
import { AdminController } from './admin.controller';
import { PatientService } from 'src/patient/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorModule } from 'src/doctor/doctor.module';
import { DoctorService } from 'src/doctor/doctor.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UsersService } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [AdminService,PatientService,DoctorService,PrismaService,AuthGuard,RolesGuard,PrismaClient],
  controllers: [AdminController]
})
export class AdminModule {}
