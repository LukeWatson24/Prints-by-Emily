import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Images

const NavNew = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navClass, setNavClass] = useState("nav-main");
  const [navLinkClass, setNavLinkClass] = useState("");
  const [homeBold, setHomeBold] = useState("");
  const [shopBold, setShopBold] = useState("");
  //const [contactBold, setContactBold] = useState("");
  //const [blogBold, setBlogBold] = useState("");
  const [line1, setLine1] = useState("line1");
  const [line2, setLine2] = useState("line2");
  const [line3, setLine3] = useState("line3");

  useEffect(() => {
    scrolledOrActiveNavLinks();
    scrolledOrActive();
    line1Class();
    line2Class();
    line3Class();
  });

  useEffect(() => {
    getPathName();
  });

  const navScrollhandler = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", navScrollhandler);

  const burgerClickHandler = () => {
    setIsActive(!isActive);
  };

  const scrolledOrActive = () => {
    if (isActive) {
      setNavClass("nav-main active");
    }

    if (scrolled && isActive) {
      setNavClass("nav-main active");
    }

    if (scrolled && !isActive) {
      setNavClass("nav-main scrolled");
    }

    if (!scrolled && !isActive) {
      setNavClass("nav-main");
    }
  };

  const scrolledOrActiveNavLinks = () => {
    if (isActive) {
      setNavLinkClass("active");
    }

    if (isActive && scrolled) {
      setNavLinkClass("active");
    }

    if (!isActive && scrolled) {
      setNavLinkClass("scrolled");
    }

    if (!isActive && !scrolled) {
      setNavLinkClass("");
    }
  };

  const line1Class = () => {
    if (isActive && scrolled) {
      setLine1("line1 active scrolled");
    }

    if (!isActive && scrolled) {
      setLine1("line1 scrolled");
    }

    if (!isActive && !scrolled) {
      setLine1("line1");
    }

    if (isActive) {
      setLine1("line1 active scrolled");
    }
  };
  const line2Class = () => {
    if (isActive && scrolled) {
      setLine2("line2 active scrolled");
    }

    if (!isActive && scrolled) {
      setLine2("line2 scrolled");
    }

    if (!isActive && !scrolled) {
      setLine2("line2");
    }

    if (isActive) {
      setLine2("line2 active scrolled");
    }
  };
  const line3Class = () => {
    if (isActive && scrolled) {
      setLine3("line3 active scrolled");
    }

    if (!isActive && scrolled) {
      setLine3("line3 scrolled");
    }

    if (!isActive && !scrolled) {
      setLine3("line3");
    }

    if (isActive) {
      setLine3("line3 active scrolled");
    }
  };

  const linkClickHandler = () => {
    setIsActive(false);
  };

  const getPathName = () => {
    if (window.location.pathname === "/") {
      setHomeBold("bold");
      setShopBold("");
    }

    if (window.location.pathname === "/shop") {
      setShopBold("bold");
      setHomeBold("");
    }
  };

  const tempHomeBold = () => {
    setHomeBold("bold");
    setShopBold("");
  };

  const tempShopBold = () => {
    setShopBold("bold");
    setHomeBold("");
  };

  return (
    <div className="nav-container">
      <div className={isActive ? "slider active" : "slider"}></div>
      <div className={navClass}>
        <div className="burger" onClick={burgerClickHandler}>
          <div className={line1}></div>
          <div className={line2}></div>
          <div className={line3}></div>
        </div>
        <Link className="RRDLink" to="/" onClick={tempHomeBold}>
          <h3
            onClick={linkClickHandler}
            className={isActive || scrolled ? "active" : null}
          >
            Prints by Emily
          </h3>
        </Link>
        <Link className="RRDLink" to="/cart">
          <svg
            className={isActive || scrolled ? "active" : null}
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
          </svg>
        </Link>
      </div>
      <ul className={navLinkClass}>
        <Link className="RRDLink" to="/" onClick={tempHomeBold}>
          <li
            className={navLinkClass + " " + homeBold}
            onClick={linkClickHandler}
          >
            Home
          </li>
        </Link>
        <Link className="RRDLink" to="/shop" onClick={tempShopBold}>
          <li
            className={navLinkClass + " " + shopBold}
            onClick={linkClickHandler}
          >
            Shop
          </li>
        </Link>
        <li className={navLinkClass} onClick={linkClickHandler}>
          Contact
        </li>
        <li className={navLinkClass} onClick={linkClickHandler}>
          Blog
        </li>
        <Link className="RRDLink" to="/cart">
          <svg
            className={"desktop " + navLinkClass}
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
          </svg>
        </Link>
      </ul>
    </div>
  );
};

export default NavNew;
