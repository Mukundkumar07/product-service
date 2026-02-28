package com.arogya.appointment.service;

import com.arogya.appointment.client.DoctorClient;
import com.arogya.appointment.dto.DoctorResponse;
import com.arogya.appointment.model.Appointment;
import com.arogya.appointment.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorClient doctorClient;

    public AppointmentService(AppointmentRepository appointmentRepository, DoctorClient doctorClient) {
        this.appointmentRepository = appointmentRepository;
        this.doctorClient = doctorClient;
    }

    public Appointment bookAppointment(Appointment appointment) {
        // Verify doctor exists via doctor-service
        DoctorResponse doctor = doctorClient.getDoctorById(appointment.getDoctorId());
        if (doctor == null) {
            throw new RuntimeException("Doctor not found with ID: " + appointment.getDoctorId());
        }

        appointment.setStatus("BOOKED");
        appointment.setPaymentStatus("PENDING");
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(UUID patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getDoctorAppointments(UUID doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public Appointment updateStatus(UUID appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
}
