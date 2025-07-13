export interface ActividadesProps {
    id?: number;
    encabezado: string;
    descp?: string;
    rating: number;
    latitud?: number;
    longitud?: number;
    foto_url: string;
    onPress: () => void;
}
