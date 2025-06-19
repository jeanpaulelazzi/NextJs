import { Controller,Post,Body, Put, UseGuards, Get, Req} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorservice: DoctorService){}

    
@UseGuards(AuthGuard,RolesGuard)
@Roles('doctor')
@Put('cancelApp')
cancelApp(@Body() body:{id: number }){
    this.doctorservice.cancelApp(body.id)
}


@UseGuards(AuthGuard,RolesGuard)
@Roles('doctor')
@Put('approveApp')
approveApp(@Body() body:{id: number }){
    this.doctorservice.approveApp(body.id)
}


@Get("appointment")
@UseGuards(AuthGuard,RolesGuard)
@Roles('doctor')
getAppointments(@Req() req){
return this.doctorservice.getAppointments(req.user.sub)
}

}
