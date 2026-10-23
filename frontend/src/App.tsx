import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VehicleList from "./components/VehicleList";
import VehicleForm from "./components/VehicleForm";
import VehicleDetail from "./components/VehicleDetail";
import { RootState } from "./store/store";


// App is the root React component of this frontend.
// It is responsible for app-level initialization and rendering the main UI.
function App() {

  //const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.vehicle);

  // If the fetch is still in progress, show a simple loading message.
  if (loading) return <div>Loading vehicles...</div>;
  // If the request failed, show the backend error message.
  if (error) return <div>Error: {error}</div>;

  // Optional: if you want App to initialize the vehicle list in Redux
  // then this is fine. If you also fetch in VehicleList, you will double-fetch.
  //const { items, loading, error } = useSelector((state) => state.vehicle);

  // useEffect runs once after the component mounts.
  // It is the correct place to trigger initialization logic such as fetching data.
  /* useEffect(() => {
    // Dispatch the async thunk that calls the GraphQL backend.
    // This starts the request to /graphql and updates state when data returns.
    dispatch(fetchVehicles({ page: 0, size: 20 }));
  }, [dispatch]); */


  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>Vehicle Registration</h1>

        <nav style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
          <Link to="/">Home</Link>
          <Link to="/vehicles">Vehicles</Link>
          <Link to="/vehicles/new"> Create Vehicle</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<VehicleList />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/new" element={<VehicleForm />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/vehicles/:id/edit" element={<VehicleForm />} />
      </Routes>
    </div>
  );
}

export default App;