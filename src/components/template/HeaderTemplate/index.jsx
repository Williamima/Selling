import { Link } from "react-router-dom";
import { useUserContext } from "../../../Providers/UserContext";
import Logo from "/src/assets/react.svg";
import styles from "/src/components/template/HeaderTemplate/styles.module.scss";

const HeaderTemplate = ({ value, button, text, link }) => {
  const { userLogout } = useUserContext();

  if (button) {
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={Logo} alt="Selling" />
        <Link className={styles.header__button} to={value} type="submit">
          {text}
        </Link>
      </header>
    );
  } else if (button === undefined) {
    return (
      <>
        <header>
          <img className={styles.logo} src={Logo} alt="Selling" />
        </header>
      </>
    );
  } else if (!button) {
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={Logo} alt="Selling" />
        <Link className={styles.header__button} to="/" onClick={userLogout}>
          {text}
        </Link>
      </header>
    );
  }
};

export { HeaderTemplate };
