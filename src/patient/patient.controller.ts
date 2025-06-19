import { Controller, Post,Get, Body,Req,UseGuards, Query, Delete ,Param, Put} from '@nestjs/common';
import { CreatePatientDTO } from './createPatientDTO';
import { PatientService } from './patient.service';
import { Roles } from 'src/roles/roles.decorator';
import { Public } from 'src/publicRoutes';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { PrismaClient } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('patient')
export class PatientController {
constructor(private readonly patientservice: PatientService){}


                                                    // Create Patients
@Post('register')
create( @Body()createUserDTO: CreatePatientDTO){
    return createUserDTO
} 


                                                    // Get Assigned Doctors
@Get("assigneddoctors")
@UseGuards(AuthGuard,RolesGuard)
@Roles('patient')
async getAllDoctors(@Query('patient') patient : string){
const doctors = await this.patientservice.assignedDoctors(patient)
return `Patient ${doctors[0].P_Fname} is assigned to ${doctors[0].Doctors?.D_FirstName}`
}



@Post('scheduleapp')
@UseGuards(AuthGuard,RolesGuard)
@Roles('patient')
scheduleApp(@Req() req,@Body()body: {doctorName: string,  date: Date}){
return this.patientservice.scheduleAppointment(req.user.sub,body.doctorName,body.date)
}


@Delete('appointment')
@UseGuards(AuthGuard,RolesGuard)
@Roles('patient')
deleteApp(@Body() body: {id: number}){
return  this.patientservice.cancelApp(body.id)
}

@Put('updateStatus')
@UseGuards(AuthGuard,RolesGuard)
@Roles('patient')
updateStatus(@Body() body:{id: number}){
return this.patientservice.updateAppStatus(body.id)
}
}
