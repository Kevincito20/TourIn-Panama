//Listo
import { useRouter } from "expo-router";

export function handlePressCatActivity ( nuevoID: string) {
  const router = useRouter();
  router.push({
    pathname: "/Actividades",
    params: { id_cat: nuevoID?.toString()},
  });
}

export function handlePressUbicacion ( latitud:number,longitud:number) {
  const router = useRouter();
  router.push({
    pathname: "/Actividades",
    params: { latitud: latitud?.toString(),longitud:longitud?.toString()},
  });
}
