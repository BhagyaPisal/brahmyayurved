import supabase from "../config/supabase.js";

export const getReviews = async (req, res) => {
  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Attach public image URLs
    const reviewsWithUrls = reviews.map((review) => {
      if (review.image_path) {
        const { data } = supabase.storage
          .from("review-images")
          .getPublicUrl(review.image_path);

        return {
          ...review,
          image_url: data.publicUrl,
        };
      }

      return review;
    });
    
    res.status(200).json({ success: true, data: reviewsWithUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { name, rating, product, review } = req.body;

    let imagePath = null;
    console.log("Received review data:", req.body);
    console.log("Received file:", req.file);
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const { error } = await supabase.storage
        .from("review-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) throw error;

      imagePath = fileName;
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          name,
          rating,
          product,
          review_comment: review,
          image_url: imagePath ? `${process.env.SUPABASE_URL}/storage/v1/object/public/review-images/${imagePath}` : null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create review" });
  }
};