import { Injectable } from '@nestjs/common';
import { Doctors } from '@prisma/client';
import { AppointmentStatus } from 'src/AppointmentStatus';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}


                            // create Doctors 
  async createDoctors(doctor: Doctors) {
    const newUser = await this.prisma.doctors.create({
      data: {
        D_FirstName: doctor.D_FirstName,
        D_LastName: doctor.D_LastName,
        D_Phonenumber: doctor.D_Phonenumber,
        D_DateOfBirth: doctor.D_DateOfBirth,
        D_specialization: doctor.D_specialization,
        D_ID: doctor.D_ID,
        D_Appointement: doctor.D_Appointement,
        D_DepartmentID: doctor.D_DepartmentID,
      },
    });
  }
                                    // Get Doctors
  async getDoctor(doctorName: string) {
    const doctor = await this.prisma.doctors.findFirst({
      where: {
        D_FirstName: doctorName,
      },
    });
    return doctor;
  }

                                    // Cancel Appointment
  async cancelApp(id: number) {
    const status = await this.prisma.appointments.update({
      where: {
        App_ID: id,
      },
      data: {
        App_Status: AppointmentStatus.CANCELLED,
      },
    });
  }
                                    //  Update Appointment
  async approveApp(id: number) {
    const status = await this.prisma.appointments.update({
      where: {
        App_ID: id,
      },
      data: {
        App_Status: AppointmentStatus.CONFIRMED,
      },
    });
  }
                                    // Get Appointments
  async getAppointments(id: number) {
    const doctor = await this.prisma.users.findFirst({
      where: {
        U_ID: id,
      },
      select: {
        Doctors: {
          select: {
            D_ID: true,
          },
        },
      },
    });

    const appointments = this.prisma.appointments.findMany({
      where: {
        App_DoctorID: doctor?.Doctors[0]?.D_ID,
        App_Status: AppointmentStatus.CONFIRMED,
      },
      select: {
        App_ID: true,
        App_PatientID: true,
        App_Status: true,
      },
    });
    return appointments;
  }
}
