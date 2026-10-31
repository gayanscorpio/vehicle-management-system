package com.example.vehicle.dto;

import com.example.vehicle.entity.Role;

import lombok.*;

@Setter
@Getter
public class RegisterRequest {
	private String username;
	private String password;
	private Role role;
}
