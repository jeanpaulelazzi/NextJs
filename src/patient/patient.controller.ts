import { Controller, Post,Get, Body,Req,Request, UseGuards } from '@nestjs/common';
import { CreatePatientDTO } from './createPatientDTO';
import { PatientService } from './patient.service';
import { Roles } from 'src/roles/roles.decorator';
import { Public } from 'src/publicRoutes';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller()
export class PatientController {
constructor(private readonly patientservice: PatientService){}





@Get('/login')
@UseGuards(AuthGuard)
@Public()
login(){
return this.patientservice.getAllPatients()
};



//LogOut
@Get('/logout')
logout(){

}


// Post
@Post('/register')
create(
    @Body()
    createUserDTO: CreatePatientDTO
){
    return createUserDTO
} 
// Get      


// Delete

}
