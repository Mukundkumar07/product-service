package com.arogya.doctor.repository;

import com.arogya.doctor.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findBySpecializationContainingIgnoreCase(String spec);
}
