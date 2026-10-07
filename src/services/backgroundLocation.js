import * as Location from "expo-location";


const LOCATION_TASK = "background-location-task";

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
  if (error) return;

  const now = new Date();
  const hour = now.getHours();

  // ❌ STOP tracking if outside time
  if (hour < 7 || hour >= 9) {
    console.log("⛔ Outside time → stopping tracking");

    const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);

    if (isRunning) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);
      console.log("🛑 Tracking stopped");
    }

    return;
  }

  // ✅ INSIDE TIME → process location
  if (data) {
    const { locations } = data;
    const coords = locations[0].coords;

    console.log("📍 Sending Location:", coords);

    // 👉 Send to backend (next step)
  }
});