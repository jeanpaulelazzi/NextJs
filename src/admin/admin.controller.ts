import { Controller,Get ,Post,Body, UseGuards, SetMetadata} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { CreatePatientDTO } from 'src/patient/createPatientDTO';
import { PatientService } from 'src/patient/patient.service';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Doctor } from 'src/doctor/createDoctorDTO';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctors, Patients} from '@prisma/client';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {

constructor(
    private readonly patient: PatientService,
    private readonly doctor: DoctorService,
    private readonly admin: AdminService
){}

                                                  //Admin login page
@Get('login')
adminLogIn(){
return 'Welcome Admin'
};


// create patient
@Post('createpatient')
@UseGuards(AuthGuard,RolesGuard)
@Roles('Admin')
async createpatient(@Body() createpatientdto: CreatePatientDTO){
const patient = await this.patient.createPatient(createpatientdto)
return patient
}


                                                //create doctors
@Post('createdoctor')
@UseGuards(AuthGuard,RolesGuard)
@Roles('Admin')
async createDoctors(@Body() createdoctordto: Doctor){
const doctor = await this.doctor.createDoctors(createdoctordto)
return doctor

}

                                                // Create appointement
@Post('createappointement')
@UseGuards(AuthGuard,RolesGuard)
@Roles('Admin')
async createAppointements(@Body() body: {patient: number,doctor: number, appointement_Date: Date}){
const appointement = await this.admin.createAppointement(body)


}

}


