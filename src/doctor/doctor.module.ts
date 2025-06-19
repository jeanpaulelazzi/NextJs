import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService],
  exports: [DoctorService]
})
export class DoctorModule {}
