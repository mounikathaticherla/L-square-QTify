import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";
import Carousel from "../Carousel/Carousel";

function Section({ title, endpoint }) {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
useEffect(() => {
  async function fetchAlbums() {
    try {
      const response = await axios.get(endpoint);
      setAlbums(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  fetchAlbums();
}, [endpoint]);
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "Collapse" : "Show All"}
</button>
      </div>

      {showAll ? (
  <div className={styles.grid}>
    {albums.map((album) => (
      <Card
        key={album.id}
        image={album.image}
        follows={album.follows}
        title={album.title}
      />
    ))}
  </div>
) : (
  <Carousel
    data={albums}
    renderItem={(album) => (
      <Card
        image={album.image}
        follows={album.follows}
        title={album.title}
      />
    )}
  />
)}
    </div>
  );
}

export default Section;