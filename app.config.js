export default ({ config }) => ({
  ...config,
  name: "TourIn-Panama",
  slug: "TourIn-Panama",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "tourinpanama",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    config: {
      googleMapsApiKey: "AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78"
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "Necesitamos tu ubicación para mostrar tu posición en el mapa."
    },
    supportsTablet: true,
  },
  android: {
    config: {
      googleMaps: {
        apiKey: "AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78"
      }
    },
    permissions: [
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION",
      "ACCESS_BACKGROUND_LOCATION"
    ],
    adaptiveIcon: {
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true,
    package: "com.anonymous.TourInPanama",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-sensors",
      {
        motionPermission: "Allow $(PRODUCT_NAME) to access your device motion"
      }
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Permitir que TourIn-Panama utilice su ubicación."
      }
    ],
    [
      "react-native-permissions",
      {
        iosPermissions: ["Camera", "Microphone"]
      }
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/logo_Tour.jpg",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ],
    [
      "@rnmapbox/maps",
      {
        RNMapboxMapsDownloadToken: "sk.eyJ1IjoidmljdG9yc3h4eHAiLCJhIjoiY21kMTltMmU0MGNsYjJscTM5NmFlNTYxMSJ9.9nmqIMici_9NeWUlP-nxlg"
      }
    ]
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    router: {},
    eas: {
      projectId: "348484c3-3eeb-4849-8980-5924f5f8e0dc",
    },
  },
  owner: "kevin_2003",
});
