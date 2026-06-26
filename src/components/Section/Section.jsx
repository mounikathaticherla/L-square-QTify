import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";
import Carousel from "../Carousel/Carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Section({ title, endpoint, type, renderItem,
  showButton = true, }) {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

const toggle = () => {
  setShowAll(!showAll);
};
  useEffect(() => {
  if (type !== "song") return;

  async function fetchGenres() {
    try {
      const res = await axios.get(
        "https://qtify-backend.labs.crio.do/genres"
      );

      setGenres([
        { key: "all", label: "All" },
        ...res.data.data,
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  fetchGenres();
}, [type]);
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
const filteredData =
  type === "song"
    ? selectedGenre === "all"
      ? albums
      : albums.filter(
          (song) => song.genre.key === selectedGenre
        )
    : albums;
  return (
    <div>
    {type === "song" && <div className={styles.line}></div>}
    <div className={styles.section}>
    <div className={styles.header}>
     <h2>{title}</h2>
  
     {showButton && (
  <button onClick={toggle}>
    {showAll ? "Collapse" : "Show All"}
  </button>
)}
    </div>
    {type === "song" && (
  <Tabs
  value={selectedGenre}
  onChange={(e, value) => setSelectedGenre(value)}
  className={styles.tabs}
>
    {genres.map((genre) => (
      <Tab
        key={genre.key}
        value={genre.key}
        label={genre.label}
      />
    ))}
  </Tabs>
)}

      {showButton ? (
  showAll ? (
    <div className={styles.grid}>
      {filteredData.map((album) => (
        <Card
        key={album.id}
image={album.image}
title={album.title}
follows={album.follows}
likes={album.likes}
type={type}
/>
      ))}
    </div>
  ) : (
    <Carousel
      data={filteredData}
      renderItem={(album) => (
        <Card
        key={album.id}
image={album.image}
title={album.title}
follows={album.follows}
likes={album.likes}
type={type}
/>
      )}
    />
  )
) : (
  <Carousel
    data={filteredData}
    renderItem={(album) => (
      <Card
      key={album.id}
image={album.image}
title={album.title}
follows={album.follows}
likes={album.likes}
type={type}
/>
    )}
  />
)}

    </div>
    </div>
  );
}

export default Section;