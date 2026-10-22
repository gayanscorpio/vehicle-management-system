package com.example.vehicle.dto;

import java.time.Instant;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class VehicleResponse {

	private UUID id;
	private String vin;
	private String plateNumber;
	private String make;
	private String model;
	private Integer year;
	private String color;
	private UUID ownerId;
	private Instant createdAt;
	private Instant updatedAt;

}
