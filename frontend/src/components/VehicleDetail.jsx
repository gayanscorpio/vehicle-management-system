import React from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

// GraphQL query to fetch one vehicle by id.
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
      createdAt
      updatedAt
    }
  }
`;

function VehicleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        return <div>Vehicle id is missing.</div>;
    }

    const { data, loading, error } = useQuery(GET_VEHICLE, {
        variables: { id },
    });

    if (loading) return <div>Loading vehicle...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data?.vehicle) return <div>Vehicle not found.</div>;

    const vehicle = data.vehicle;

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
            <h2>Vehicle Details</h2>

            <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
                <p><strong>ID:</strong> {vehicle.id}</p>
                <p><strong>VIN:</strong> {vehicle.vin}</p>
                <p><strong>Plate Number:</strong> {vehicle.plateNumber}</p>
                <p><strong>Make:</strong> {vehicle.make}</p>
                <p><strong>Model:</strong> {vehicle.model}</p>
                <p><strong>Year:</strong> {vehicle.year}</p>
                <p><strong>Color:</strong> {vehicle.color || "N/A"}</p>
                <p><strong>Owner ID:</strong> {vehicle.ownerId || "N/A"}</p>
                <p><strong>Created:</strong> {vehicle.createdAt}</p>
                <p><strong>Updated:</strong> {vehicle.updatedAt}</p>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => navigate(`/vehicles/${id}/edit`)}>Edit</button>{" "}
                <button onClick={() => navigate("/vehicles")}>Back to List</button>
            </div>
        </div>
    );
}

export default VehicleDetail;