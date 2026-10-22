package com.example.vehicle.dto;

import org.springframework.data.domain.Page;
import java.util.List;

public class VehiclePage {
	private List<VehicleResponse> content;
	private long totalElements;
	private int totalPages;
	private int page;
	private int size;

	public VehiclePage() {
	}

	public static VehiclePage from(Page<VehicleResponse> page) {
		VehiclePage result = new VehiclePage();

		result.setContent(page.getContent());
		result.setTotalElements(page.getTotalElements());
		result.setTotalPages(page.getTotalPages());
		result.setPage(page.getNumber());
		result.setSize(page.getSize());

		return result;
	}

	public List<VehicleResponse> getContent() {
		return content;
	}

	public void setContent(List<VehicleResponse> content) {
		this.content = content;
	}

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

}
