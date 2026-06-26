import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, endpoint }) {
  const [albums, setAlbums] = useState([]);
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
        <button>Show All</button>
      </div>

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
    </div>
  );
}

export default Section;