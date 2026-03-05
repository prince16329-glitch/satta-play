export default function sitemap() {
    return [
        {
            url: "https://www.b1sattaplay.in/",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://www.b1sattaplay.in/chart",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: "https://www.b1sattaplay.in/results",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        }
    ];
}