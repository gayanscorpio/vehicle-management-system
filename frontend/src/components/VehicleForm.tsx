import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import {
    CreateVehicleInput,
    CreateVehicleMutationData,
    UpdateVehicleInput,
    UpdateVehicleMutationData,
    Vehicle,
} from "../types/Vehicle";

//Convert the form component to typed props/state
type VehicleFormState = {
    vin: string;
    plateNumber: string;
    make: string;
    model: string;
    year: number;
    color: string;
    ownerId: string;
};

type VehicleQueryData = {
    vehicle: Vehicle | null;
};


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
    //This makes - VehicleFormState form state explicit and safe.
    const [form, setForm] = useState<VehicleFormState>({
        vin: "",
        plateNumber: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        color: "",
        ownerId: "",
    });

    // Fetch existing vehicle when editing
    const { data, loading: loadingVehicle } = useQuery<VehicleQueryData>(GET_VEHICLE, {
        variables: { id },
        skip: !isEditMode,
    })
    useEffect(() => {
        if (data?.vehicle) {
            setForm({
                vin: data.vehicle.vin || "",
                plateNumber: data.vehicle.plateNumber || "",
                make: data.vehicle.make || "",
                model: data.vehicle.model || "",
                year: data.vehicle.year || new Date().getFullYear(),
                color: data.vehicle.color || "",
                ownerId: data.vehicle.ownerId || "",
            });
        }
    }, [data]);

    // Create mutation
    const [createVehicle, { loading: creating }] = useMutation<CreateVehicleMutationData,
        { input: CreateVehicleInput }
    >(CREATE_VEHICLE, {
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
    const [updateVehicle, { loading: updating }] = useMutation<
        UpdateVehicleMutationData, { id: string; input: UpdateVehicleInput }
    >(UPDATE_VEHICLE, {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "year" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload: CreateVehicleInput = {
            vin: form.vin.trim(),
            plateNumber: form.plateNumber.trim(),
            make: form.make.trim(),
            model: form.model.trim(),
            year: Number(form.year),
            color: form.color.trim() || null,
            ownerId: form.ownerId ? form.ownerId.trim() : null,
        };

        if (isEditMode && id) {
            const updatePayload: UpdateVehicleInput = {
                ...payload,
            };

            updateVehicle({
                variables: {
                    id,
                    input: updatePayload,
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

                    <button type="button" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}