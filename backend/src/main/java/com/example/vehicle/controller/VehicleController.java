package com.example.vehicle.controller;

import java.net.URI;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehicle.dto.CreateVehicleRequest;
import com.example.vehicle.dto.VehicleResponse;
import com.example.vehicle.service.VehicleService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/v1/vehicles")
@AllArgsConstructor
public class VehicleController {

	private final VehicleService vehicleService;

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<VehicleResponse> registerVehicle(@Valid @RequestBody CreateVehicleRequest request) {
		UUID id = vehicleService.registerVehicle(request);
		VehicleResponse response = vehicleService.getVehicle(id);
		return ResponseEntity.created(URI.create("/api/v1/vehicles/" + id)).body(response);
	}

}
