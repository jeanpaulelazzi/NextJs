import { Injectable } from '@nestjs/common';
import { Doctors, Patients } from '@prisma/client';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService,
        private readonly prisma: PrismaService
    ){}

async createAppointement(body){
const date = new Date(body.appointement_Date)

const patient = await this.prisma.patients.findUnique({
    where: {
        P_Username : body.patient
    },
    
});


const doctor = await this.prisma.doctors.findUnique({
    
    where: {
        D_Username : body.doctor
    }
});

if(doctor && patient){
const appointement =  await this.prisma.appointments.create({
    data: {
        App_Date : date.toISOString(),
        App_PatientID: patient?.P_ID ,
        App_DoctorID : doctor?.D_ID 
    }
}
)}
 
}
 }


