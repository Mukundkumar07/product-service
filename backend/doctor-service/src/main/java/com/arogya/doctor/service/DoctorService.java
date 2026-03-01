package com.arogya.doctor.service;

import com.arogya.doctor.model.Doctor;
import com.arogya.doctor.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> searchBySpecialization(String spec) {
        return doctorRepository.findBySpecializationContainingIgnoreCase(spec);
    }

    public Doctor getDoctorById(UUID id) {
        return doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
    }
}
