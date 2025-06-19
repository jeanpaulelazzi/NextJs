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

                                    //create An Appointment
async createAppointement(body){
const date = new Date(body.appointement_Date)
console.log(body.appointement_Date)
console.log(date)

const patient = await this.prisma.patients.findUnique({
    where: {
        P_ID : body.patient
    },
});

const doctor = await this.prisma.doctors.findUnique({
    
    where: {
        D_ID : body.doctor
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
)}else{
    console.log("Cannot create an appointment")
}
 
}
 }


