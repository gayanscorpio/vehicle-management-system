package com.example.vehicle.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.vehicle.dto.CreateVehicleRequest;
import com.example.vehicle.dto.UpdateVehicleRequest;
import com.example.vehicle.dto.VehicleResponse;

public interface VehicleService {

	UUID registerVehicle(CreateVehicleRequest request);

	VehicleResponse getVehicle(UUID id);

	Page<VehicleResponse> searchVehicles(String vin, String plateNumber, String make, String model, Integer year,
			Pageable pageable);

	VehicleResponse updateVehicle(UUID id, UpdateVehicleRequest request);

	void deleteVehicle(UUID id);

}
