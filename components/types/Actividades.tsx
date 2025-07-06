export interface ActividadesProps {
    id: string;
    categoria: string;
    titulo: string;
    descripcion?: string;
    ubicacion: string;
    rating: number;
    imagen: string;
    longitud?: number;
    latitud?: number;
    onPress: () => void;
}
