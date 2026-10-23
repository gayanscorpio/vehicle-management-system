export type Vehicle = {
    id: string;
    vin: string;
    plateNumber: string;
    make: string;
    model: string;
    year: number;
    color?: string | null;
    ownerId?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

export type CreateVehicleInput = {
    vin: string;
    plateNumber: string;
    make: string;
    model: string;
    year: number;
    color?: string | null;
    ownerId?: string | null;
};

export type UpdateVehicleInput = {
    vin: string;
    plateNumber: string;
    make: string;
    model: string;
    year: number;
    color?: string | null;
    ownerId?: string | null;
};

export type VehicleListPayload = {
    content: Vehicle[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
};

export type VehicleListQueryData = {
    vehicles: VehicleListPayload;
};

export type VehicleDetailQueryData = {
    vehicle: Vehicle | null;
};

export type CreateVehicleMutationData = {
    createVehicle: Vehicle;
};

export type UpdateVehicleMutationData = {
    updateVehicle: Vehicle;
};

export type DeleteVehicleMutationData = {
    deleteVehicle: boolean;
};