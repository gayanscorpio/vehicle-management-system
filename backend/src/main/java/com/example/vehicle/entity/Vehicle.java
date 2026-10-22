package com.example.vehicle.entity;

import java.time.Instant;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;
import lombok.*;

/**
 * Vehicle.java // JPA entity with @Table, @UniqueConstraints, @Version,
 * auditing fields
 */

@Entity
@Table(name = "vehicles", uniqueConstraints = { @UniqueConstraint(name = "uk_vehicle_vin", columnNames = "vin"),
		@UniqueConstraint(name = "uk_vehicle_plate", columnNames = "plate_number") })
@Getter
@Setter
@NoArgsConstructor
public class Vehicle {

	@Id
	@GeneratedValue
	@UuidGenerator
	@JdbcTypeCode(SqlTypes.CHAR)
	@Column(name = "id", length = 36, nullable = false)
	private UUID id;

	@Column(nullable = false, length = 17)
	private String vin;

	@Column(name = "plate_number", nullable = false, length = 20)
	private String plateNumber;

	@Column(nullable = false, length = 100)
	private String make;

	@Column(nullable = false, length = 100)
	private String model;

	@Column(nullable = false)
	private Integer year;

	@Column(length = 50)
	private String color;

	@JdbcTypeCode(SqlTypes.CHAR)
	@Column(name = "owner_id", length = 36)
	private UUID ownerId;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	@Column(name = "updated_at")
	private Instant updatedAt;

	@Version
	private Long version;

}
