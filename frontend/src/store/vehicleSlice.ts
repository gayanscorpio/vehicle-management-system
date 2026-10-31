import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { apolloClient } from "../apollo/apolloClient";

import {
    CreateVehicleInput,
    CreateVehicleMutationData,
    Vehicle,
    VehicleListPayload,
    VehicleListQueryData,
} from "../types/Vehicle";

// GraphQL query used to fetch a paginated list of vehicles.
// This is the operation that will hit the backend endpoint defined in apolloClient.js.
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

// GraphQL mutation used to create a new vehicle.
// The input matches the backend CreateVehicleInput structure.
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
    }
  }
`;

// Initial state for the vehicle slice.
// This is the base state Redux uses before any data is loaded.
/* const initialState = {
    items: [],
    selectedVehicle: null,
    loading: false,
    error: null,
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
}; */

type VehicleState = {
    items: Vehicle[];
    selectedVehicle: Vehicle | null;
    loading: boolean;
    error: string | null;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

const initialState: VehicleState = {
    items: [],
    selectedVehicle: null,
    loading: false,
    error: null,
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
};


// createAsyncThunk is Redux Toolkit's recommended way to handle async actions.
// Here, it wraps the Apollo GraphQL query and turns it into a Redux action flow.
/* export const fetchVehicles = createAsyncThunk(
    "vehicle/fetchVehicles",
    async ({ page = 0, size = 20 } = {}, thunkAPI) => {
        try {
            // ApolloClient.query sends the GraphQL request to the backend.
            // The backend resolves it and returns response.data.vehicles.
            const response = await client.query({
                query: GET_VEHICLES,
                variables: { page, size },
            });

            // Return the paginated payload from the backend.
            return response.data.vehicles;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
); */

export const fetchVehicles = createAsyncThunk
    <VehicleListPayload,
        { page?: number; size?: number } | undefined
    >("vehicle/fetchVehicles", async (args, thunkAPI) => {
        const { page = 0, size = 20 } = args ?? {};
        try {
            const response = await apolloClient.query<VehicleListQueryData>({
                query: GET_VEHICLES,
                variables: { page, size },
            });

            //if error found retrun below error rather than undefined
            if (!response.data?.vehicles) {
                throw new Error("Vehicle list response is empty");
            }

            return response.data?.vehicles
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to fetch vehicles";
            throw new Error(message);
        }
    });

// Async thunk for creating a vehicle.
// This is used when the user submits the vehicle form.
export const addVehicle = createAsyncThunk<
    Vehicle,
    CreateVehicleInput
>("vehicle/addVehicle", async (input) => {
    try {
        // ApolloClient.mutate sends a GraphQL mutation to the backend.
        const response = await apolloClient.mutate<CreateVehicleMutationData>({
            mutation: CREATE_VEHICLE,
            variables: { input },
        });

        if (!response.data?.createVehicle) {
            throw new Error("Create vehicle response is empty");
        }

        // Return the newly created vehicle object.
        return response.data?.createVehicle;
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to create vehicle";
        throw new Error(message);
    }
});

// createSlice is the main Redux store builder.
// It contains the reducer logic and automatically creates action creators.
const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        // Clear any previous fetch/create error from the Redux state.
        clearVehicleError: (state) => {
            state.error = null;
        },
        // Example extra reducer for selecting a vehicle in UI state.
        // This is useful when you open a vehicle detail page.
        setSelectedVehicle: (state, action) => {
            state.selectedVehicle = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH: loading state starts when request is sent.
            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // FETCH: success updates the items list and pagination meta.
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.content;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.page;
                state.size = action.payload.size;
            })
            // FETCH: request failed; store the error for UI display.
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch vehicles";
            })
            // CREATE: while request is pending, set loading flag.
            .addCase(addVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // CREATE: after success, prepend the new vehicle to the list.
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            // CREATE: if mutation fails, store the error.
            .addCase(addVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to create vehicle";
            });
    },
});

// Export the action creators for use in components.
export const { clearVehicleError, setSelectedVehicle } = vehicleSlice.actions;

// Export the reducer so the Redux store can register it.
export default vehicleSlice.reducer;