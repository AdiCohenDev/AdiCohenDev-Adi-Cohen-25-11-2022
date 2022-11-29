import { useState } from "react";
import { BeatLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.loaderContainer}>
      <BeatLoader size={16} color={"#cecece"} loading={loading} />
    </div>
  );
};
export default Loader;
