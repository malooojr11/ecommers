import React, { useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../../Context/CartContext";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";

export default function CategoryProducts() {
  const { id } = useParams(); // Get the category ID from the URL

  // Get addToCart from context
  const { addToCart } = useContext(CartContext);

  async function addProductToCart(prodId) {
    try {
      const response = await addToCart(prodId);
      if (response.data?.status === 'success') {
        toast.success(response.data?.message, {
          duration: 3000,
          position: 'top-center',
        });
      } else {
        toast.error('Something went wrong!', {
          duration: 3000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Unexpected error occurred");
    }
  }


  // Fetch products that belong to the given category using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category-products", id], // Unique key to identify this query
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`) // API call
        .then((res) => res.data.data), // Extract products array
  });

  // Show a loading spinner while fetching
  if (isLoading) return <Spinner />;

  // Show an error message if fetch fails
  if (isError)
    return (
      <p className="text-center text-red-600 mt-10">
        Failed to load category products.
      </p>
    );

  // Render the list of products
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Products</h2>

      {/* If there are no products */}
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No products in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.map((prod) => (
            <div
              key={prod._id}
              className="border p-4 rounded-lg hover:shadow transition"
            >
              {/* Product details link */}
              <Link to={`/productDetails/${prod._id}/${prod.category.name}`}>
                <img
                  src={prod.imageCover}
                  alt={prod.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h4 className="text-sm font-medium truncate mb-1">{prod.title}</h4>
                <p className="text-gray-500">{prod.price} EGP</p>
              </Link>

              {/* Placeholder button (you can wire this to your addToCart logic) */}
              <button onClick={() => addProductToCart(prod._id)} className='px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all w-fit mt-3'>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
