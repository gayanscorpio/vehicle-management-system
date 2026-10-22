import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

// GraphQL query for fetching a single vehicle when editing.
const GET_VEHICLE = gql`
  query vehicle($id: ID!) {
    vehicle(id: $id) {
      id
      vin
      plateNumber
      make
      model
      year
      color
      ownerId
    }
  }
`;

// GraphQL mutation to create a new vehicle.
const CREATE_VEHICLE = gql`
  mutation createVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
      id
      vin
      plateNumber
      make
      model
      year
      color
      ownerId
      createdAt
      updatedAt
    }
  }
`;

// GraphQL mutation to update an existing vehicle.
const UPDATE_VEHICLE = gql`
  mutation updateVehicle($id: ID!, $input: UpdateVehicleInput!) {
    updateVehicle(id: $id, input: $input) {
      id
      vin
      plateNumber
      make
      model
      year
      color
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export default function VehicleForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    // Local form state
    const [form, setForm] = useState({
        vin: "",
        plateNumber: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        color: "",
        ownerId: "",
    });

    // Fetch existing vehicle when editing
    const { data, loading: loadingVehicle } = useQuery(GET_VEHICLE, {
        variables: { id },
        skip: !isEditMode,
        onCompleted: (response) => {
            if (response?.vehicle) {
                setForm({
                    vin: response.vehicle.vin || "",
                    plateNumber: response.vehicle.plateNumber || "",
                    make: response.vehicle.make || "",
                    model: response.vehicle.model || "",
                    year: response.vehicle.year || new Date().getFullYear(),
                    color: response.vehicle.color || "",
                    ownerId: response.vehicle.ownerId || "",
                });
            }
        },
    });

    // Create mutation
    const [createVehicle, { loading: creating }] = useMutation(CREATE_VEHICLE, {
        onCompleted: (response) => {
            if (response?.createVehicle?.id) {
                navigate(`/vehicles/${response.createVehicle.id}`);
            }
        },
        onError: (error) => {
            alert("Create failed: " + error.message);
        },
    });

    // Update mutation
    const [updateVehicle, { loading: updating }] = useMutation(UPDATE_VEHICLE, {
        onCompleted: (response) => {
            if (response?.updateVehicle?.id) {
                navigate(`/vehicles/${response.updateVehicle.id}`);
            }
        },
        onError: (error) => {
            alert("Update failed: " + error.message);
        },
    });

    // If a vehicle is being loaded for editing, show a loader.
    if (isEditMode && loadingVehicle) {
        return <div>Loading vehicle...</div>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "year" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            vin: form.vin.trim(),
            plateNumber: form.plateNumber.trim(),
            make: form.make.trim(),
            model: form.model.trim(),
            year: Number(form.year),
            color: form.color.trim() || null,
            ownerId: form.ownerId ? form.ownerId.trim() : null,
        };

        if (isEditMode) {
            updateVehicle({
                variables: {
                    id,
                    input: payload,
                },
            });
        } else {
            createVehicle({
                variables: {
                    input: payload,
                },
            });
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto" }}>
            <h2>{isEditMode ? "Edit Vehicle" : "Create Vehicle"}</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "12px" }}>
                    <label>
                        VIN
                        <br />
                        <input
                            type="text"
                            name="vin"
                            value={form.vin}
                            onChange={handleChange}
                            required
                            minLength={17}
                            maxLength={17}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Plate Number
                        <br />
                        <input
                            type="text"
                            name="plateNumber"
                            value={form.plateNumber}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Make
                        <br />
                        <input
                            type="text"
                            name="make"
                            value={form.make}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Model
                        <br />
                        <input
                            type="text"
                            name="model"
                            value={form.model}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Year
                        <br />
                        <input
                            type="number"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            required
                            min="1886"
                            max="3000"
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Color
                        <br />
                        <input
                            type="text"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Owner ID
                        <br />
                        <input
                            type="text"
                            name="ownerId"
                            value={form.ownerId}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" disabled={creating || updating}>
                        {isEditMode ? (updating ? "Updating..." : "Update Vehicle") : creating ? "Creating..." : "Create Vehicle"}
                    </button>

                    <button type="button" onClick={() => history.goBack()}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}