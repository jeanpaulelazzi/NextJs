import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Patients } from '@prisma/client';
import * as bcrypt from 'bcrypt';



@Injectable()
export class PatientService {
constructor(private readonly prisma: PrismaService){}



// Finde a specific patient
async findPatient(username: string) {
    const patient = await this.prisma.patients.findUnique({
    where: {
      P_Username: username
    },
    
  });
  return patient;
}

// Get All Patients
async  getAllPatients(){
return await this.prisma.patients.findMany()
}


// create a new Patient
async createPatient(patient: Patients){
const hashpass = await bcrypt.hash(patient.P_Password,10)
const newUser = await this.prisma.patients.create({
  data: {
    P_Username : patient.P_Username,
    P_Password: hashpass,
    P_Fname: patient.P_Fname,
    P_Lname: patient.P_Lname,
    P_Adress: patient.P_Adress,
    P_PhoneNumber: patient.P_PhoneNumber,
    P_DateOfBirth: patient.P_DateOfBirth,
    P_Condition: patient.P_Condition,

  }

})
}

}
