import React, { useEffect, useState } from "react";
import { getReviews, createReview } from "../services/api";

interface Review {
  id: number;
  name: string;
  rating: number;
  product: string | null;
  review_comment: string;
  image_url: string | null;
  created_at?: string;
}

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Reviews
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await getReviews();

        if (response.success && Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      }
    };

    loadReviews();
  }, []);

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ Submit Review
  const handleSubmit = async () => {
    if (!name || !rating || !reviewText) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await createReview(
        {
          name,
          rating,
          product,
          review: reviewText,
        },
        imageFile || undefined
      );

      // Backend likely returns { success: true, data: {...} }
      if (response.success && response.data) {
        setReviews((prev) => [response.data, ...prev]);
      }

      // Reset form
      setName("");
      setRating(0);
      setProduct("");
      setReviewText("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit review.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#F4EFE6] text-stone-800 min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-6">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-green-900 mb-3">
            Customer Reviews
          </h1>
          <p className="text-stone-600">
            Real experiences shared by our customers.
          </p>
        </div>

        {/* ✅ Image Gallery */}
        {reviews.some((r) => r.image_url) && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Customer Images
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {reviews
                .filter((r) => r.image_url)
                .map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedImage(r.image_url!)}
                    className="bg-white p-2 rounded-md shadow-sm cursor-pointer"
                  >
                    <img
                      src={r.image_url!}
                      alt="Customer"
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ✅ Reviews List */}
          <div>
            <h2 className="text-xl font-semibold mb-6">
              Customer Reviews ({reviews.length})
            </h2>

            <div className="space-y-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{r.name}</p>
                    <div className="text-yellow-500 text-sm">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </div>
                  </div>

                  {r.product && (
                    <p className="text-sm text-stone-600 mb-2">
                      Product: {r.product}
                    </p>
                  )}

                  <p className="text-sm">{r.review_comment}</p>

                  {r.image_url && (
                    <img
                      src={r.image_url}
                      alt="Review"
                      onClick={() => setSelectedImage(r.image_url!)}
                      className="mt-3 w-20 h-20 object-cover rounded-md cursor-pointer border"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Review Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-6">
              Share Your Experience
            </h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="border p-3 rounded w-full mb-4"
            />

            {/* Rating */}
            <div className="mb-4">
              <p className="mb-2 font-medium">Your Rating:</p>
              <div className="flex text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="border p-3 rounded w-full mb-4"
            >
              <option value="">Select Product</option>
              <option value="Soap">Soap</option>
              <option value="Churna">Churna</option>
              <option value="Hair Oil">Hair Oil</option>
              <option value="Combo">Combo</option>
            </select>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="border p-3 rounded w-full mb-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(
                  e.target.files ? e.target.files[0] : null
                )
              }
              className="mb-4"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded mb-4"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-700 text-white px-6 py-3 rounded-full w-full"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>

        {/* ✅ Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 rounded-lg max-w-2xl w-full"
            >
              <img
                src={selectedImage}
                alt="Full view"
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Testimonials;