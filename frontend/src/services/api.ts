export interface Review {
    id?: string;
    name: string;
    rating: number;
    product: string;
    review: string;
    image_url?: string;
    created_at?: string;
}

const BASE_URL = "http://localhost:5000/api";
// change to your deployed backend URL in production

/**
 * GET Reviews
 */
export const getReviews = async (): Promise<Review[]> => {
    const response = await fetch(`${BASE_URL}/reviews`);

    if (!response.ok) {
        throw new Error("Failed to fetch reviews");
    }

    return response.json();
};

/**
 * POST Review (with image)
 */
export const createReview = async (review: any, imageFile?: File) => {
    const formData = new FormData();

    formData.append("name", review.name);
    formData.append("rating", review.rating.toString());
    formData.append("product", review.product);
    formData.append("review", review.review);

    if (imageFile) {
        formData.append("image", imageFile);
    }

    const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Failed to create review");
    return response.json();
};