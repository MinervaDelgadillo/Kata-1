export const netPresets = [
    {
        quality: "Excellent",
        download: 40,
    }, 
    {
        quality: "Good",
        download: 30,
    }, 
    {
        quality: "Regular",
        download: 20,
    }, 
    {
        quality: "Bad",
        download: 10,
    },
    {
        quality: "Random",
        download: Math.round(Math.random()*(40-10+1)+10),
    }
];

