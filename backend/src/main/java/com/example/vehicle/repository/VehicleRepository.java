package com.example.vehicle.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vehicle.entity.Vehicle;

/**
 * VehicleRepository.java // extends JpaRepository<Vehicle, UUID>,
 * JpaSpecificationExecutor<Vehicle>
 */

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {

	Optional<Vehicle> findByVin(String vin);

	Optional<Vehicle> findByPlateNumber(String plateNumber);

	boolean existsByVin(String vin);

	boolean existsByPlateNumber(String plateNumber);

}
