"use client"

import { useState, useEffect } from 'react';
import { MyContext } from "./ThemeContext"

const ThemeProvider = ({ children }) => {

    const [productData, setProductData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [isopenNavigation, setIsopenNavigation] = useState(false);

    const [isLogin, setIsLogin] = useState();
    const [isOpenFilters, setIsopenFilters] = useState(false);


  useEffect(() => {
    // getData('http://localhost:5000/productData');
    // getCartData("http://localhost:5000/cartItems");

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

   
      setTimeout(() => {
        setProductData(data[1]);
        setIsloading(false);
      }, 3000);


  
  }, []);

  const getData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setProductData(response.data);
        setTimeout(()=>{
          setIsloading(false);
        },2000); 
      })


      await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=27dad2d0abd34a22965727ce8d939077').then((response) => {
          console.log(response)
      })



    } catch (error) {
      console.log(error.message);
    }
  }

  const getCartData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setCartItems(response.data);
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  const addToCart = async (item) => {
    item.quantity = 1;

    try {
      await axios.post("http://localhost:5000/cartItems", item).then((res) => {
        if (res !== undefined) {
          setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  const removeItemsFromCart = (id) => {
    const arr = cartItems.filter((obj) => obj.id !== id);
    setCartItems(arr)
  }

  const emptyCart = () => {
    setCartItems([])
  }


  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }


  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }


  const openFilters=()=>{
    setIsopenFilters(!isOpenFilters)
  }


    const value = {
        cartItems,
        isLogin,
        windowWidth,
        isOpenFilters,
        addToCart,
        removeItemsFromCart,
        emptyCart,
        signOut,
        signIn,
        openFilters,
        isopenNavigation,
        setIsopenNavigation
    }

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )


}

export default ThemeProvider;