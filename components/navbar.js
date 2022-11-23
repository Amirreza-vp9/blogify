import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/router";

const NavBar = () => {
  const [icon, setIcon] = useState(false);
  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover5, setHover5] = useState(false);

  const router = useRouter();

  const iconHandler = () => {
    icon === false ? setIcon(true) : setIcon(false);
  };

  return (
    <>
      <div className={styles.sideContainer}>
        <div onClick={iconHandler} className={styles.icon}>
          <div
            className={
              icon === false ? `${styles.iconLeft}` : `${styles.closeIconLeft}`
            }
          ></div>
          <div
            className={
              icon === false
                ? `${styles.iconRight}`
                : `${styles.closeIconRight}`
            }
          ></div>
          <div
            onClick={() => setIcon(false)}
            className={
              icon === false
                ? `${styles.closeHidden}`
                : `${styles.closeVisible}`
            }
          >
            CLOSE
          </div>
        </div>
        <div
          className={
            icon === false ? `${styles.category}` : `${styles.closeCategory}`
          }
        >
          <div onClick={() => router.push("/dashboard")}>DASHBOARD</div>
          <div onClick={() => router.push("/blogs")}>BLOGS</div>
          <div onClick={() => router.push("/users")}>WRITERS</div>
        </div>
        <div
          className={icon === false ? `${styles.lang}` : `${styles.closeLang}`}
        >
          <img src="../images/icon-b.webp" width={35} height={35} />
        </div>
      </div>
      {icon === true ? (
        <>
          <img src="../images/icon-b.webp" className={styles.logo} />
          <div className={styles.mainContainer}>
            <div className={styles.mainCategory}>
              <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                  router.push("/dashboard");
                  setIcon(false);
                }}
              >
                DASHBOARD
              </div>
              {hover ? (
                <div className={styles.arrow}>
                  <div className={styles.arrowTop}></div>
                  <div className={styles.arrowMiddle}></div>
                  <div className={styles.arrowBottom}></div>
                </div>
              ) : (
                ""
              )}
              <div
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}
                onClick={() => {
                  router.push("/blogs");
                  setIcon(false);
                }}
              >
                BLOGS
              </div>
              {hover2 ? (
                <div className={styles.arrow}>
                  <div className={styles.arrowTop}></div>
                  <div className={styles.arrowMiddle}></div>
                  <div className={styles.arrowBottom}></div>
                </div>
              ) : (
                ""
              )}
              <div
                onMouseEnter={() => setHover3(true)}
                onMouseLeave={() => setHover3(false)}
                onClick={() => {
                  router.push("/users");
                  setIcon(false);
                }}
              >
                WRITERS
              </div>
              {hover3 ? (
                <div className={styles.arrow}>
                  <div className={styles.arrowTop}></div>
                  <div className={styles.arrowMiddle}></div>
                  <div className={styles.arrowBottom}></div>
                </div>
              ) : (
                ""
              )}
              <div
                onMouseEnter={() => setHover5(true)}
                onMouseLeave={() => setHover5(false)}
                onClick={() => {
                  router.push("/login");
                  setIcon(false);
                }}
              >
                LOGIN
              </div>
              {hover5 ? (
                <div className={styles.arrow}>
                  <div className={styles.arrowTop}></div>
                  <div className={styles.arrowMiddle}></div>
                  <div className={styles.arrowBottom}></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
