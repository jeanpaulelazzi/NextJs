import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Authservice } from 'src/auth/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  
  controllers: [DoctorController],
  providers: [DoctorService,PrismaClient,Authservice,UsersService,PrismaService,AdminModule,PrismaClient],
  exports: [DoctorService]
})
export class DoctorModule {}
