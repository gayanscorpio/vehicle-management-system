package com.example.vehicle.dto;

import java.util.UUID;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Setter
public class CreateVehicleRequest {

	@NotBlank
	@Size(min = 17, max = 17)
	private String vin;

	@NotBlank
	@Size(max = 20)
	private String plateNumber;

	@NotBlank
	@Size(max = 100)
	private String make;

	@NotBlank
	@Size(max = 100)
	private String model;

	@NotNull
	@Min(1886)
	@Max(3000)
	private Integer year;

	@Size(max = 50)
	private String color;

	private UUID ownerId;

}
