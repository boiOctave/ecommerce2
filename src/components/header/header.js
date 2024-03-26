"use client";
import React, { useState, useEffect, useRef } from "react";
import "../header/header.css";
import Logo from "../../assets/images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../selectDrop/select";
import axios from "axios";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconCompare from "../../assets/images/icon-compare.svg";
import IconHeart from "../../assets/images/icon-heart.svg";
import IconCart from "../../assets/images/icon-cart.svg";
import IconUser from "../../assets/images/icon-user.svg";

import Button from "@mui/material/Button";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import Nav from "./nav/nav";
import  Link  from "next/link";
import Image from "next/image";
import { useContext } from "react";

import { MyContext } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Header = (props) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenAccDropDown, setisOpenAccDropDown] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window?.innerWidth);
  const [isopenSearch, setOpenSearch] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const headerRef = useRef();
  const searchInput = useRef();

  const context = useContext(MyContext);
  const history = useRouter();

  useEffect(() => {}, [context.cartItems]);

  const [categories, setcategories] = useState([
    "Milks and Dairies",
    "Wines & Drinks",
    "Clothing & beauty",
    "Fresh Seafood",
    "Pet Foods & Toy",
    "Fast food",
    "Baking material",
    "Vegetables",
    "Fresh Fruit",
    "Bread and Juice",
    "Milks and Dairies",
    "Wines & Drinks",
    "Clothing & beauty",
    "Fresh Seafood",
  ]);

  const countryList = [];

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      window.addEventListener("scroll", () => {
        let position = window.pageYOffset;
        if (position > 100) {
          headerRef.current.classList.add("fixed");
        } else {
          headerRef.current.classList.remove("fixed");
        }
      });
    }
  }, []);
  const getCountry = async (url) => {
    try {
      await axios.get(url).then((res) => {
        if (res !== null) {
          //console.log(res.data.data);
          res.data.data.map((item, index) => {
            countryList.push(item.country);
            //console.log(item.country)
          });

          //console.log(res.data.data[0].country)
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = () => {
    context.signOut();
    history.push("/");
  };

  const openSearch = () => {
    setOpenSearch(true);
    searchInput.current.focus();
  };

  const closeSearch = () => {
    setOpenSearch(false);
    searchInput.current.blur();
    searchInput.current.value = "";
  };

  const openNav = () => {
    setIsOpenNav(true);
    context.setIsopenNavigation(true);
  };

  const closeNav = () => {
    setIsOpenNav(false);
    setisOpenAccDropDown(false);
    context.setIsopenNavigation(false);
  };

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2 part1 d-flex align-items-center">
                <Link href="/">
               
                  <Image src={Logo} className="logo" />
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="afterHeader"></div>
    </>
  );
};

export default Header;
