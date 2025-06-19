import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Patients } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly doctorservice: DoctorService,
  ) {}

  async getAllPatients() {
    return await this.prisma.patients.findMany();
  }

                                          // create a new Patient
  async createPatient(patient: Patients) {
    const newUser = await this.prisma.patients.create({
      data: {
        P_Fname: patient.P_Fname,
        P_Lname: patient.P_Lname,
        P_Adress: patient.P_Adress,
        P_PhoneNumber: patient.P_PhoneNumber,
        P_DateOfBirth: patient.P_DateOfBirth,
        P_Condition: patient.P_Condition,
      },
    });
  }

                                          // Get Assigned Doctors
  async assignedDoctors(patient: string) {
    const allDoctors = await this.prisma.patients.findMany({
      where: {
        P_Fname: patient,
      },
      select: {
        P_Fname: true,
        Doctors: {
          select: {
            D_FirstName: true,
          },
        },
      },
    });
    return allDoctors;
  }

                                      //Schedule appointment

  async scheduleAppointment(userID: number, doctorName: string, date: Date) {
    const patient = await this.prisma.users.findFirst({
      where: {
        U_ID: userID,
      },
      select: {
        Patients: {
          select: {
            P_ID: true,
          },
        },
      },
    });

    const formattedDate = new Date(date).toISOString();
    const doctor = await this.doctorservice.getDoctor(doctorName);
    const appointment = await this.prisma.appointments.create({
      data: {
        App_Date: formattedDate,
        App_DoctorID: doctor?.D_ID,
        App_PatientID: patient?.Patients[0]?.P_ID,
      },
    });
    return appointment;
  }


                                  // Cancel App
  async cancelApp(id: number) {
    const cancelAPP = await this.prisma.appointments.delete({
      where: {
        App_ID: id,
      },
    });
    return 'Successfully Deleted';
  }


                                    // Update App
  async updateAppStatus(id: number) {
    const status = await this.prisma.appointments.update({
      where: {
        App_ID: id,
      },
      data: {
        App_Status: 'Done',
      },
    });
    return 'Status Updated';
  }
}
