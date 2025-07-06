// data/actividadesData.ts
import { ActividadesProps } from '@/components/types/Actividades';

export const actividadesData: ActividadesProps[] = [
  {
    id: '1',
    categoria: 'Actividades',
    titulo: 'Excursión a la montaña',
    descripcion: 'Disfruta de un día en la naturaleza con esta emocionante excursión.',
    ubicacion: 'Parque Nacional',
    rating: 4.5,
    imagen: 'https://images.unsplash.com/photo-1747767763480-a5b4c7a82aef?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0',
    // Longitud y latitud opcionales, puedes agregarlos si tienes coordenadas
    longitud: -79.8134,
    latitud: 8.8859,
    onPress: () => {}, // Este se sobreescribirá al usar el hook
  },
  {
    id: '2',
    categoria: 'Actividades',
    titulo: 'Clase de cocina local',
    descripcion: 'Aprende a cocinar platos típicos de la región con un chef local.',
    ubicacion: 'Centro Cultural',
    rating: 4.8,
    imagen: 'https://plus.unsplash.com/premium_photo-1683707120391-6c0da3cac6be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
    // Longitud y latitud opcionales, puedes agregarlos si tienes coordenadas
    longitud: -79.8134,
    latitud: 8.8859,
    onPress: () => {},
  },
];

export const actividadesCardsData: ActividadesProps[] = [
  {
    id: '1',
    categoria: 'Actividades',
    titulo: 'Tour al Canal',
    ubicacion: 'Ciudad de Panamá',
    rating: 4.7,
    imagen: 'https://elfarodelcanal.com/wp-content/uploads/2022/09/2022-07-01-003-ElCanaldePanama-108-operacion-2.jpg',
    onPress: () => {},
  },
  {
    id: '2',
    categoria: 'Actividades',
    titulo: 'Isla Taboga',
    ubicacion: 'Archipiélago de las Perlas',
    rating: 4.9,
    imagen: 'https://th.bing.com/th/id/R.ef82c38849ac1e843425a5c659d3a39b?rik=%2bz%2fJC5dtBdC6LA&pid=ImgRaw&r=0',
    onPress: () => {},
  },
  {
    id: '3',
    categoria: 'Actividades',
    titulo: 'Cerro Ancón',
    ubicacion: 'Ciudad de Panamá',
    rating: 4.5,
    imagen: 'https://th.bing.com/th/id/R.ef82c38849ac1e843425a5c659d3a39b?rik=%2bz%2fJC5dtBdC6LA&pid=ImgRaw&r=0',
    onPress: () => {},
  },
  {
    id: '4',
    categoria: 'Actividades',
    titulo: 'Biomuseo',
    ubicacion: 'Calzada de Amador',
    rating: 4.6,
    imagen: 'https://elfarodelcanal.com/wp-content/uploads/2022/09/2022-07-01-003-ElCanaldePanama-108-operacion-2.jpg',
    onPress: () => {},
  },
  {
    id: '5',
    categoria: 'Actividades',
    titulo: 'Casco Antiguo',
    ubicacion: 'Ciudad de Panamá',
    rating: 4.8,
    imagen: 'https://elfarodelcanal.com/wp-content/uploads/2022/09/2022-07-01-003-ElCanaldePanama-108-operacion-2.jpg',
    onPress: () => {},
  },
  {
    id: '6',
    categoria: 'Actividades',
    titulo: 'Isla Contadora',
    ubicacion: 'Archipiélago de las Perlas',
    rating: 4.9,
    imagen: 'https://th.bing.com/th/id/R.ef82c38849ac1e843425a5c659d3a39b?rik=%2bz%2fJC5dtBdC6LA&pid=ImgRaw&r=0',
    onPress: () => {},
  },
];

