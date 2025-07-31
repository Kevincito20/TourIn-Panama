//Listo
import { useRouter } from "expo-router";

export function handlePressCatActivity ( nuevoID: string) {
  const router = useRouter();
  router.push({
    pathname: "/Actividades",
    params: { id_cat: nuevoID?.toString()},
  });
}
