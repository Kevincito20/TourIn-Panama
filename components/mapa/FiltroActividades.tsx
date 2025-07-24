//Listo
import { useRouter } from "expo-router";

export function useFiltroInicial( nuevoID: string | null, colors: string) {
  const router = useRouter();
  router.push({
    pathname: "/(tabs)/pantalla_mapa copy",
    params: { id_cat: nuevoID?.toString() ?? "" , color:colors},
  });
}
