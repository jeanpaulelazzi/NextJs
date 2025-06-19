import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth/auth.module';
import { Authservice } from 'src/auth/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [
    DoctorModule,
    JwtModule.register({
      global: true,
      secret: 'lkdfjadlkfjalkdjfaldkjfladkjfabcdedffadfaadsfjfdaklfjadladjfladjflkasdjflasdkjfa',
      signOptions:{expiresIn: '1h'}
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, PrismaService,Authservice,UsersService]

})
export class PatientModule {}
