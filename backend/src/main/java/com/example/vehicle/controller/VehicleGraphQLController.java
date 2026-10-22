package com.example.vehicle.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.vehicle.dto.CreateVehicleRequest;
import com.example.vehicle.dto.UpdateVehicleRequest;
import com.example.vehicle.dto.VehiclePage;
import com.example.vehicle.dto.VehicleResponse;
import com.example.vehicle.service.VehicleService;

import lombok.AllArgsConstructor;

import java.util.UUID;

@Controller
@AllArgsConstructor
public class VehicleGraphQLController {

	private final VehicleService vehicleService;

	@QueryMapping
	public VehicleResponse vehicle(@Argument UUID id) {
		return vehicleService.getVehicle(id);
	}

	@QueryMapping
	public VehiclePage vehicles(@Argument Integer page, @Argument Integer size, @Argument String vin,
			@Argument String plateNumber, @Argument String make, @Argument String model, @Argument Integer year) {

		int pageNumber = page == null ? 0 : page;
		int pageSize = size == null ? 20 : size;

		Page<VehicleResponse> result = vehicleService.searchVehicles(vin, plateNumber, make, model, year,
				PageRequest.of(pageNumber, pageSize));

		return VehiclePage.from(result);
	}

	@MutationMapping
	public VehicleResponse createVehicle(@Argument CreateVehicleRequest input) {
		UUID id = vehicleService.registerVehicle(input);
		return vehicleService.getVehicle(id);
	}

	@MutationMapping
	public VehicleResponse updateVehicle(@Argument UUID id, @Argument UpdateVehicleRequest input) {
		return vehicleService.updateVehicle(id, input);
	}

	@MutationMapping
	public Boolean deleteVehicle(@Argument UUID id) {
		vehicleService.deleteVehicle(id);
		return Boolean.TRUE;
	}

}