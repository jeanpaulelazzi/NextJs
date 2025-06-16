import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { patient } from './patient';



@Injectable()
export class PatientService {
constructor(private readonly prisma: PrismaService){}




async findPatient(username: string) {
    const patient = await this.prisma.patients.findUnique({
    where: {
      P_Username: username
    },
    
  });
  return patient;
}

async  getAllPatients(){
return await this.prisma.patients.findMany()
}

}

