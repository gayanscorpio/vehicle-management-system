import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useAuth } from "../context/AuthContext";

import {
    Vehicle,
    VehicleListQueryData,
    DeleteVehicleMutationData
} from "../types/Vehicle";

type VehicleListData = {
    vehicles: {
        content: Vehicle[];
        totalElements: number;
        totalPages: number;
        page: number;
        size: number;
    };
};

// GraphQL query for listing vehicles.
const GET_VEHICLES = gql`
  query vehicles($page: Int, $size: Int) {
    vehicles(page: $page, size: $size) {
      content {
        id
        vin
        plateNumber
        make
        model
        year
        color
      }
      totalElements
      totalPages
      page
      size
    }
  }
`;

// GraphQL mutation for deleting a vehicle.
const DELETE_VEHICLE = gql`
  mutation deleteVehicle($id: ID!) {
    deleteVehicle(id: $id)
  }
`;

function VehicleList() {

    const { role } = useAuth();
    /* const { data, loading, error, refetch } = useQuery(GET_VEHICLES, {
         variables: { page: 0, size: 20 },
         fetchPolicy: "cache-and-network",
     }); */

    //This gives proper autocomplete and type safety.
    //This gives - VehicleListData proper autocomplete and type safety.
    const { data, loading, error, refetch } = useQuery<VehicleListQueryData>(GET_VEHICLES, {
        variables: { page: 0, size: 20 },
        fetchPolicy: "cache-and-network",
    });

    const [deleteVehicle, { loading: deleting }] = useMutation<DeleteVehicleMutationData>
        (DELETE_VEHICLE, {
            onCompleted: () => {
                refetch();
            },
            onError: (err) => {
                alert("Delete failed: " + err.message);
            },
        });

    if (loading) return <div>Loading vehicles...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const vehicles: Vehicle[] = data?.vehicles?.content || [];
    const isAdmin = role === "ADMIN";

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Vehicles</h2>
                {isAdmin && (<Link to="/vehicles/new">
                    <button>Create Vehicle</button>
                </Link>
                )}
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>VIN</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Plate</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Make</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Model</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Year</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.vin}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.plateNumber}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.make}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.model}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.year}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                <Link to={`/vehicles/${vehicle.id}`}>View</Link>{" "}
                                {isAdmin && (
                                    <>
                                        {" "}
                                        <Link to={`/vehicles/${vehicle.id}/edit`}>Edit</Link>{" "}
                                    </>
                                )}
                                {(role === "ADMIN" || role === "USER") && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm("Delete this vehicle?")) {
                                                deleteVehicle({
                                                    variables: { id: vehicle.id },
                                                });
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VehicleList;