import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleSlice";

// Root Redux store for the app.
// This is the single state container for the React app.
export const store = configureStore({
    reducer: {
        // The key "vehicle" gives access to the slice state via:
        // state.vehicle
        vehicle: vehicleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;