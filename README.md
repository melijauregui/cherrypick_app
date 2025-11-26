# Run 
- front:  npm run ios/android  
- server: npm run start:backend
- database: (cd inference && source .venv/bin/activate) uvicorn server:app --reload 
- seed: db:seed-complete

source venv/bin/activate
deactivate

en ios dentro de Info.plist:
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para tomar fotos y grabar videos.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Permitir que Cherrypick acceda a tus foto.</string>


# Ejemplo en endpoint 3000 en server
http://localhost:3000/images/jean.webp

deberia devolver:
[
  {
    "id": "9.jpg",
    "score": 0.699426651,
    "values": [],
    "brand": "pinterest",
    "type": "jean"
  },
  {
    "id": "14.jpg",
    "score": 0.697699,
    "values": [],
    "brand": "pinterest",
    "type": "jean"
  },
  {
    "id": "11.jpg",
    "score": 0.661187947,
    "values": [],
    "brand": "pinterest",
    "type": "jean"
  }
]

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

