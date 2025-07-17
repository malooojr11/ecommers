import { createContext } from "react";
import { useState } from "react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const WishlistContext = createContext();

export  function WishlistProvider({ children }) {
    const [wishlistIds, setWishlistIds] = useState([]);
    const token = localStorage.getItem('userToken');

    function getWishlist() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: { token }
        })
            .then(({ data }) => {
                const ids = data.data.map(item => item._id);
                setWishlistIds(ids);
            })
            .catch(err => console.error("Failed to load wishlist", err));
    }

    function toggleWishlist(productId) {
        if (!wishlistIds.includes(productId)) {
            axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
                headers: { token }
            })
                .then(() => {
                    setWishlistIds(prev => [...prev, productId]);
                    toast.success("Added to wishlist ");
                })
                .catch(() => toast.error("Failed to add to wishlist"));
        } else {
            axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token }
            })
                .then(() => {
                    setWishlistIds(prev => prev.filter(id => id !== productId));
                    toast.success("Removed from wishlist ");
                })
                .catch(() => toast.error("Failed to remove from wishlist"));
        }
    }

    useEffect(() => {
        if (token) getWishlist();
    }, [token]);

    return (
        <WishlistContext.Provider value={{toggleWishlist, wishlistIds, setWishlistIds }}>
            {children}
        </WishlistContext.Provider>
    );
}
