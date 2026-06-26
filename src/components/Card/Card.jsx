import { Chip } from "@mui/material";
import styles from "./Card.module.css";

function Card({ image, follows, title, type, likes}) {
  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <img src={image} alt={title} />

        <div className={styles.chip}>
          <Chip
            label={
type==="song"
? `${likes} Likes`
: `${follows} Follows`
}
            size="small"
            sx={{
              backgroundColor: "#121212",
              color: "#fff",
            }}
          />
        </div>
      </div>

      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;