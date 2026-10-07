// =====================================================
// scheduler.js
// =====================================================
// This file does NOT define a background location task.
// LocationService.js is responsible for the location task.
// =====================================================

export const registerScheduler = async () => {
  try {
    console.log("✅ Scheduler registered");
  } catch (error) {
    console.log("❌ Scheduler registration error:", error);
  }
};