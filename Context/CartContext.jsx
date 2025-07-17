import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0)

export default function CartContextProvider(props) {
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [products, setproducts] = useState(null)
    let headers = {
        token: localStorage.getItem('userToken')
    }
    let token = localStorage.getItem('userToken')

    function addToCart(prodId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: prodId }, { headers }
        ).then((response) => {
            getUserCart()
            return response
        }).catch((error) => {
            return error
        })
    }

    function getUserCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers
        }).then((response) => {
            setcartId(response.data?.cartId)
            setnumOfCartItems(response.data?.numOfCartItems)
            settotalCartPrice(response.data?.data?.totalCartPrice)
            setproducts(response.data?.data?.products)
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateUserCart(prodId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, { count: count }, { headers }).then((response) => {
            console.log('Update user cart', response);
            
            setcartId(response.data?.cartId)
            setnumOfCartItems(response.data?.numOfCartItems)
            settotalCartPrice(response.data?.data?.totalCartPrice)
            setproducts(response.data?.data?.products)
            return response
        }).catch((error) => {
            console.log('Update user cart error', error);
            return error

        })
    }

    function deleteProduct(prodId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, { headers }).then((response) => {
            setcartId(response.data?.cartId)
            setnumOfCartItems(response.data?.numOfCartItems)
            settotalCartPrice(response.data?.data?.totalCartPrice)
            setproducts(response.data?.data?.products)
            return response
        }).catch((error) => {
            console.log('delete product error', error);
            return error
        })
    }

function clearCart() {
  return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
    .then((response) => {
      setcartId(null);
      setnumOfCartItems(0);
      settotalCartPrice(0);
      setproducts([]);
      return response;
    })
    .catch((error) => {
      console.log("Clear cart error:", error);
      return error;
    });
}


    useEffect(() => {
        if (token) {
            getUserCart()
        }
    }, [token])

    return <>
        <CartContext.Provider value={{ clearCart, addToCart, cartId, numOfCartItems, totalCartPrice, products, updateUserCart, deleteProduct }}>
            {props.children}
        </CartContext.Provider>
    </>
}