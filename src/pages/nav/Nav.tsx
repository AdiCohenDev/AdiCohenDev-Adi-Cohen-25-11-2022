import styles from "./Nav.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeSwitchButton from "../../shared/components/ToggleThemeButton";
import ToggleFAndC from "../../shared/components/ToggleDegree/ToggleFAndC";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          MyWeather
        </div>
        <div className={styles.routingButton}>
          <NavLink to="/" end>
            {({ isActive }) =>
              isActive ? (
                <span
                  className={styles.navLink}
                  style={{
                    paddingBottom: "6px",
                    borderBottom: "2px solid rgba(255, 255, 255)",
                    color: "white",
                  }}
                >
                  Home
                </span>
              ) : (
                <span className={styles.navLink}>Home</span>
              )
            }
          </NavLink>
          <NavLink to="/favorites" end>
            {({ isActive }) =>
              isActive ? (
                <span
                  className={styles.navLink}
                  style={{
                    paddingBottom: "6px",
                    borderBottom: "2px solid rgba(255, 255, 255)",
                    color: "white",
                  }}
                >
                  Favorites
                </span>
              ) : (
                <span className={styles.navLink}>Favorites</span>
              )
            }
          </NavLink>
        </div>
        <div className={styles.userPreferenceToggleButtonsContainer}>
          <div className={styles.toggleDegreeContainer}>
            <ToggleFAndC />
          </div>
          <div className={styles.themeSwitchContainer}>
            <ThemeSwitchButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
