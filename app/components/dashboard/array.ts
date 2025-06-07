export const initialData = {
  metrics: [
    { date: "2024-06-01", hydration: 65, acne: 2, pigmentation: 40 },
    { date: "2024-06-08", hydration: 70, acne: 1, pigmentation: 38 },
    { date: "2024-06-15", hydration: 72, acne: 1, pigmentation: 36 },
    { date: "2024-06-22", hydration: 75, acne: 0, pigmentation: 34 },
  ],
  aiScans: [
    { date: "2024-06-01", hydration: 65, acne: 2, notes: "Improved hydration" },
    { date: "2024-06-08", hydration: 70, acne: 1, notes: "Less acne" },
    { date: "2024-06-15", hydration: 72, acne: 1, notes: "Stable" },
    { date: "2024-06-22", hydration: 75, acne: 0, notes: "Clear skin" },
  ],
  photoLogs: [
    { date: "2024-06-01", url: "/uploads/selfie1.jpg" },
    { date: "2024-06-08", url: "/uploads/selfie2.jpg" },
    { date: "2024-06-15", url: "/uploads/selfie3.jpg" },
    { date: "2024-06-22", url: "/uploads/selfie4.jpg" },
  ],
  routineAdherence: [
    { date: "2024-06-01", am: true, pm: false },
    { date: "2024-06-02", am: true, pm: true },
    { date: "2024-06-03", am: false, pm: true },
    { date: "2024-06-04", am: true, pm: true },
  ],
};