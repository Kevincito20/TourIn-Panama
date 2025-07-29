export interface ProvinciaItem {
  id: string;
  nombre: string;
  imagen: string;
}

export interface Region {
  titulo: string;
  provincias: ProvinciaItem[];
}

export const regiones: Region[] = [
  {
    titulo: "Región Occidental",
    provincias: [
      {
        id: "1",
        nombre: "Chiriquí",
        imagen: "https://revistapanorama.com/storage/2025/06/BOQUETE_Feria-de-las-Flores-JPG-2.jpg",
      },
      {
        id: "2",
        nombre: "Bocas del Toro",
        imagen: "https://media.telemetro.com/p/f8caacf58bf807081bf226d7009b2cb1/adjuntos/311/imagenes/010/513/0010513037/1200x675/smart/isla-colon-bocas-del-toro.jpg",
      },
      {
        id: "3",
        nombre: "Ngöbe-Buglé",
        imagen: "https://midiario.com/resizer/v2/3ZP65ZBP3VBH3BPQ3TKDG63EAM.jpg?auth=a2ad336c9d127afa16c73904048323cf7846252a28ba73cd91a8e4d79a8e5e6b&width=1200",
      },
    ],
  },
  {
    titulo: "Región Central",
    provincias: [
      {
        id: "4",
        nombre: "Veraguas",
        imagen: "https://mediaim.expedia.com/destination/1/eea9e899a284885c3869e6f367960851.jpg",
      },
      {
        id: "5",
        nombre: "Coclé",
        imagen: "https://blog.gotuuri.com/wp-content/uploads/2024/01/Nota-1-1.webp",
      },
      {
        id: "6",
        nombre: "Herrera",
        imagen: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/653562351.jpg?k=806d447a27dad4095b7b76604f03a0115c9b23549b6bdb9ab29913d574763234&o=&hp=1",
      },
      {
        id: "7",
        nombre: "Los Santos",
        imagen: "https://www.heypanama.com/content/gallery130/2020-05-17-18-2817926945091589758115.jpg",
      },
    ],
  },
  {
    titulo: "Región Metropolitana y Caribe",
    provincias: [
      {
        id: "8",
        nombre: "Panamá",
        imagen: "https://embajadadepanamaenfrancia.fr/wp-content/uploads/2019/04/panama5.jpg",
      },
      {
        id: "9",
        nombre: "Panamá Oeste",
        imagen: "https://mediaim.expedia.com/destination/1/9b3844383d948ab69d0275dfbbae364e.jpg",
      },
      {
        id: "10",
        nombre: "Colón",
        imagen: "https://caribe.lat/blog/wp-content/uploads/2017/06/Puerto-Col%C3%B3n-Panam%C3%A1-opt.jpg",
      },
      {
        id: "11",
        nombre: "Guna Yala",
        imagen: "https://integralatampost.s3.amazonaws.com/uploads/article/picture/8771/20180710_San-Blas-Islands-in-Panam%C3%A1-the-most-underrated-corner-of-Latin-America.jpg",
      },
      {
        id: "12",
        nombre: "Madungandí",
        imagen: "https://barca-agroforestal.com/sites/default/files/styles/shadowbox/public/Kuna%20huts.jpg?itok=ONivMkaJ",
      },
    ],
  },
  {
    titulo: "Región Oriental",
    provincias: [
      {
        id: "13",
        nombre: "Darién",
        imagen: "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_2385343.webp?w=1600&h=900",
      },
      {
        id: "14",
        nombre: "Emberá-Wounaan",
        imagen: "https://sertv.gob.pa/crisolfm/wp-content/uploads/sites/2/2020/03/comarca-Ember%C3%A1-Wounaan-Panama.jpg",
      },
      {
        id: "15",
        nombre: "Wargandí",
        imagen: "https://mapio.net/images-p/37404729.jpg",
      },
    ],
  },
];
