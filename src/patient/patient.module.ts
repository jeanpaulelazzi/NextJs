import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth/auth.module';
import { Authservice } from 'src/auth/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'lkdfjadlkfjalkdjfaldkjfladkjfabcdedffadfaadsfjfdaklfjadladjfladjflkasdjflasdkjfa',
      signOptions:{expiresIn: '1h'}
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, PrismaService,Authservice,UsersService],

})
export class PatientModule {}
