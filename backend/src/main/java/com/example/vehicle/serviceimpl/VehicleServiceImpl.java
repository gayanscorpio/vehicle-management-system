package com.example.vehicle.serviceimpl;

import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vehicle.dto.CreateVehicleRequest;
import com.example.vehicle.dto.UpdateVehicleRequest;
import com.example.vehicle.dto.VehicleResponse;
import com.example.vehicle.entity.Vehicle;
import com.example.vehicle.exception.DuplicateResourceException;
import com.example.vehicle.exception.NotFoundException;
import com.example.vehicle.mapper.VehicleMapper;
import com.example.vehicle.repository.VehicleRepository;
import com.example.vehicle.service.VehicleService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VehicleServiceImpl implements VehicleService {

	private final VehicleRepository vehicleRepository;
	private final VehicleMapper mapper;

	@Transactional
	public UUID registerVehicle(CreateVehicleRequest request) {
		// basic existence checks
		if (vehicleRepository.existsByVin(request.getVin())) {
			throw new DuplicateResourceException("Vehicle with VIN already exists");
		}
		if (vehicleRepository.existsByPlateNumber(request.getPlateNumber())) {
			throw new DuplicateResourceException("Vehicle with plate number already exists");
		}

		Vehicle v = mapper.toEntity(request);
		try {
			Vehicle saved = vehicleRepository.save(v);
			return saved.getId();
		} catch (DataIntegrityViolationException ex) {
			// translate DB constraint violation to domain exception
			throw new DuplicateResourceException("Constraint violation while creating vehicle: " + ex.getMessage());
		}
	}

	@Transactional(readOnly = true)
	public VehicleResponse getVehicle(UUID id) {
		Vehicle v = vehicleRepository.findById(id).orElseThrow(() -> new NotFoundException("Vehicle not found: " + id));
		return mapper.toResponse(v);
	}

	@Transactional(readOnly = true)
	public Page<VehicleResponse> searchVehicles(String vin, String plateNumber, String make, String model, Integer year,
			Pageable pageable) {
		// For simplicity use repository.findAll(pageable) here. In real implementation
		// use Specification or QueryDSL.
		return vehicleRepository.findAll(pageable).map(mapper::toResponse);
	}

	@Transactional
	public VehicleResponse updateVehicle(UUID id, UpdateVehicleRequest request) {
		Vehicle v = vehicleRepository.findById(id).orElseThrow(() -> new NotFoundException("Vehicle not found: " + id));

		// check for unique constraints if changed
		if (!v.getVin().equals(request.getVin()) && vehicleRepository.existsByVin(request.getVin())) {
			throw new DuplicateResourceException("Vehicle with VIN already exists");
		}
		if (!v.getPlateNumber().equals(request.getPlateNumber())
				&& vehicleRepository.existsByPlateNumber(request.getPlateNumber())) {
			throw new DuplicateResourceException("Vehicle with plate number already exists");
		}

		mapper.updateEntityFromDto(request, v);
		try {
			Vehicle saved = vehicleRepository.save(v);
			return mapper.toResponse(saved);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateResourceException("Constraint violation while updating vehicle: " + ex.getMessage());
		}
	}

	@Transactional
	public void deleteVehicle(UUID id) {
		if (!vehicleRepository.existsById(id)) {
			throw new NotFoundException("Vehicle not found: " + id);
		}
		vehicleRepository.deleteById(id);

	}

}
