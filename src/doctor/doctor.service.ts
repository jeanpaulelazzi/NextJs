import { Injectable } from '@nestjs/common';
import { Doctors } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DoctorService {
    constructor(private readonly prisma: PrismaClient){}

async createDoctors(doctor: Doctors){
   const newUser =  await this.prisma.doctors.create({
        data:{
            D_FirstName: doctor.D_FirstName,
            D_LastName : doctor.D_LastName,
            D_Phonenumber: doctor.D_Phonenumber,
            D_DateOfBirth: doctor.D_DateOfBirth,
            D_specialization: doctor.D_specialization,
            D_ID : doctor.D_ID,
            D_Appointement: doctor.D_Appointement,
            D_DepartmentID: doctor.D_DepartmentID,
            D_Username: doctor.D_Username,
            D_Password: doctor.D_Password

        }
    })

}
}
