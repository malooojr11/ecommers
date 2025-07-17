import React from "react";
import "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export default function Categories() {
  /* ── Fetch all categories using React Query ─────────── */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"], // Unique key for caching and identifying the query
    queryFn: () =>
      axios
        .get("https://ecommerce.routemisr.com/api/v1/categories") // API call to fetch categories
        .then((res) => res.data.data), // Extract only the categories array
    staleTime: 1000 * 60 * 5 // Cache is considered fresh for 5 minutes
  });

  /* ── Handle loading and error states ─────────── */
  if (isLoading) return <Spinner/>;
  if (isError) return <p className="text-center py-10 text-red-600">Error fetching categories.</p>;

  /* ── Render the UI ──────────────────── */
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">All Categories</h2>

      {/* If no categories are returned */}
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        // Display categories in a responsive grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.map((cat) => (
            <Link
              to={`/categories/${cat._id}`} // Link to category details page
              key={cat._id}
              className="border p-4 rounded-lg flex flex-col items-center hover:shadow-lg transition"
            >
              {/* Category image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-contain mb-3"
              />
              {/* Category name */}
              <h4 className="text-sm font-medium text-center">{cat.name}</h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
