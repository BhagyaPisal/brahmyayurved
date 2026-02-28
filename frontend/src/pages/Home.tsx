import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../services/api";

interface Review {
  id?: string;
  name: string;
  rating: number;
  review_comment: string;
  created_at?: string;
}

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews();
        console.log("Reviews API response:", res);

        if (res?.success && Array.isArray(res.data)) {

          setReviews(res.data.slice(0, 6)); // Show top 6
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const displayReviews =
    reviews.length > 0 ? reviews :[];

  return (
    <div className="bg-[#F4EFE6] text-stone-800">

      {/* HERO */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#CFE3D4] to-[#E9DDBF]">
        <h2 className="text-4xl md:text-5xl font-bold text-green-900 leading-snug">
          Pure Ayurveda. Delivered to Your Doorstep.
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-700">
          Natural skincare, haircare & wellness products crafted with ancient Ayurvedic wisdom.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition"
          >
            Shop Now
          </Link>

          <a
            href="https://wa.me/917219248924"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-700 px-8 py-3 rounded-full hover:bg-green-700 hover:text-white transition"
          >
            Order on WhatsApp
          </a>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h3 className="text-3xl font-semibold mb-12 text-center">
          Featured Products
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { name: "Charcoal Soap", image: "/images/charcoal_soap.jpg" },
            { name: "Sandalwood Soap", image: "/images/sandalwood_soap.jpg" },
            { name: "Ubtan Soap", image: "/images/ubtan_soap.jpg" },
            { name: "Skin Care Kit", image: "/images/skin_care_kit.jpg" },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center"
            >
              <div className="bg-[#F5F1E8] rounded-xl h-56 w-full flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              <h4 className="mt-6 font-semibold text-lg text-center">
                {product.name}
              </h4>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="text-green-800 text-lg hover:underline"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-6">
          About Brahmyayurved
        </h3>

        <p className="text-stone-600 leading-relaxed">
          Brahmyayurved was started in 2019 by three students with a simple passion —
          to provide authentic Ayurvedic products that customers can trust.
          Our goal is to bring natural, traditional wellness solutions
          directly to your doorstep.
        </p>

        <Link
          to="/about"
          className="inline-block mt-6 text-green-800 hover:underline"
        >
          Read More →
        </Link>
      </section>

      {/* DYNAMIC REVIEWS SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h3 className="text-3xl font-semibold mb-12 text-center">
          What Our Customers Say
        </h3>

        {loading ? (
          <p className="text-center text-stone-500">Loading reviews...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayReviews.map((review, index) => (
              <div
                key={review.id || index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm text-stone-600 mb-4 line-clamp-3">
                    {review.review_comment}
                  </p>

                  {/* ⭐ Rating Stars */}
                  <div className="flex gap-1 text-yellow-500 mb-2 text-lg">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-semibold text-green-900 mt-2">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/testimonials"
            className="text-green-800 hover:underline"
          >
            View All Reviews →
          </Link>
        </div>
      </section>

      {/* WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/917219248924"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        WhatsApp
      </a>
    </div>
  );
};

export default Home;