export interface ActividadesProps {
    id: string;
    categoria: string;
    titulo: string;
    descripcion?: string;
    ubicacion: string;
    rating: number;
    imagen: string;
    onPress: () => void;
}
