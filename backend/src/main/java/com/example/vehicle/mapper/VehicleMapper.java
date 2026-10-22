package com.example.vehicle.mapper;

import java.time.Instant;

import org.springframework.stereotype.Component;

import com.example.vehicle.dto.CreateVehicleRequest;
import com.example.vehicle.dto.UpdateVehicleRequest;
import com.example.vehicle.dto.VehicleResponse;
import com.example.vehicle.entity.Vehicle;

/**
 * MapStruct interface or manual mapper
 */
@Component
public class VehicleMapper {

	public Vehicle toEntity(CreateVehicleRequest req) {
		if (req == null)
			return null;
		Vehicle v = new Vehicle();
		v.setVin(req.getVin());
		v.setPlateNumber(req.getPlateNumber());
		v.setMake(req.getMake());
		v.setModel(req.getModel());
		v.setYear(req.getYear());
		v.setColor(req.getColor());
		v.setOwnerId(req.getOwnerId());
		v.setCreatedAt(Instant.now());
		v.setUpdatedAt(Instant.now());
		return v;
	}

	public void updateEntityFromDto(UpdateVehicleRequest req, Vehicle v) {
		if (req == null || v == null)
			return;
		v.setVin(req.getVin());
		v.setPlateNumber(req.getPlateNumber());
		v.setMake(req.getMake());
		v.setModel(req.getModel());
		v.setYear(req.getYear());
		v.setColor(req.getColor());
		v.setOwnerId(req.getOwnerId());
		v.setUpdatedAt(Instant.now());
	}

	public VehicleResponse toResponse(Vehicle v) {
		if (v == null)
			return null;
		VehicleResponse r = new VehicleResponse();
		r.setId(v.getId());
		r.setVin(v.getVin());
		r.setPlateNumber(v.getPlateNumber());
		r.setMake(v.getMake());
		r.setModel(v.getModel());
		r.setYear(v.getYear());
		r.setColor(v.getColor());
		r.setOwnerId(v.getOwnerId());
		r.setCreatedAt(v.getCreatedAt());
		r.setUpdatedAt(v.getUpdatedAt());
		return r;
	}

}
