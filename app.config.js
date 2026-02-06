export default ({ config }) => ({
  ...config,
  expo: {
    name: "cherrypick",
    slug: "cherrypick",
    owner: "cherrypickapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/small_logo.png",
    scheme: "cherrypick",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    platforms: ["ios", "android", "web"],
    ios: {
      bundleIdentifier: "com.cherrypickapp.googleauthern",
      supportsTablet: true,
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              "com.googleusercontent.apps.321366117154-gq34d2c6r30i8tl8r45dpte4i0ba8nk9",
            ],
          },
          {
            CFBundleURLSchemes: ["cherrypick"],
          },
        ],
        ITSAppUsesNonExemptEncryption: false,
        NSCameraUsageDescription:
          "Esta aplicación necesita acceso a la cámara para tomar fotos y grabar videos.",
        NSMicrophoneUsageDescription:
          "Esta aplicación necesita acceso al micrófono para grabar videos.",
        NSPhotoLibraryUsageDescription:
          "Esta aplicación necesita acceso a tu biblioteca de fotos para seleccionar imágenes.",
      },
      build: {
        production: {
          ios: { buildType: "archive" },
        },
      },
    },
    android: {
      package: "com.cherrypickapp.googleauthern",
      adaptiveIcon: {
        foregroundImage: "./assets/images/small_logo.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_EXTERNAL_STORAGE",
      ],
    },
    web: {
      bundler: "metro",
      output: "server",
      favicon: "./assets/images/small_logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/small_logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
      [
        "expo-camera",
        {
          cameraPermission:
            "Permitir que Cherrypick acceda a tu cámara para tomar fotos y grabar videos.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Permitir que Cherrypick acceda a tus foto.",
        },
      ],
      "expo-video",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: "cherrypick://",
      },
      LOCAL_IP: process.env.LOCAL_IP || "localhost",
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      PROD_BACKEND: process.env.PROD_BACKEND || "",
      ENVIRONMENT: process.env.ENVIRONMENT || "development",
      eas: {
        projectId: "e0d221a6-6b38-4601-8549-ca222a510406",
      },
    },
  },
});
