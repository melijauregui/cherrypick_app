export default {
    expo: {
        name: "Cherrypick",
        slug: "cherrypick",
        scheme: "cherrypick",
        version: "1.0.0",
        extra: {
            LOCAL_IP: process.env.LOCAL_IP || "localhost",
            BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
        },
    },
};
