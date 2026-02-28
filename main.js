// ================= PRODUCTS DATA =================

const products = [
  {
    name: "Charcoal Soap 100gm",
    price: "₹99",
    desc: "Targeted for tan removal and skin brightening.",
    img: "./assets/charcoal_soap.jpg"
  },
  {
    name: "Sandalwood Soap 100gm",
    price: "₹99",
    desc: "Formulated for natural glow and radiance.",
    img: "./assets/sandalwood_soap.jpg"
  },
  {
    name: "Ubtan Soap 100gm",
    price: "₹99",
    desc: "A herbal cleansing soap for a natural glow.",
    img: "./assets/ubtan_soap.jpg"
  },
  {
    name: "Abhyanga Oil 50ml",
    price: "₹79",
    desc: "Deeply moisturizes & calms the mind.",
    img: "./assets/abhyanga_oil.jpg"
  },
  {
    name: "Lip Balm",
    price: "₹29",
    desc: "Locks in moisture and prevents dryness.",
    img: "./assets/lip_balm.jpg"
  },
  {
    name: "Ubtan Powder 50gm",
    price: "₹99",
    desc: "Traditional herbal body scrub powder.",
    img: "./assets/ubtan_powder.jpg"
  },
  {
    name: "Chandan Powder 30gm",
    price: "₹69",
    desc: "Brightens skin & improves texture.",
    img: "./assets/chandan_powder.jpg"
  },
  {
    name: "Multani Mitti 30gm",
    price: "₹39",
    desc: "Natural clay for deep cleansing & oil control.",
    img: "./assets/multani_mitti.jpg"
  },
  {
    name: "Hair Oil 50ml",
    price: "₹99",
    desc: "Strengthens follicles & reduces hair fall.",
    img: "./assets/hair_oil.jpg"
  },
  {
    name: "Skin Care Kit",
    price: "₹449",
    desc: "Complete Ayurvedic skin care combo.",
    img: "./assets/skin_care_kit.jpg"
  }
];


// ================= PRODUCT CARD =================

function createProductCard(p) {
  const msg = encodeURIComponent(
    `Hi Brahmyayurved Team,\n\nI would like to order:\n\nProduct: ${p.name}\nPrice: ${p.price}\n\nPlease assist with the process.`
  );

  return `
    <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      
      <div class="aspect-[4/3] bg-white overflow-hidden rounded mb-4 flex items-center justify-center">
        <img src="${p.img}" 
             alt="${p.name}" 
             class="max-h-full object-contain">
      </div>

      <h4 class="font-semibold text-lg">${p.name}</h4>
      <p class="text-sm text-stone-600 mt-1">${p.desc}</p>

      <div class="flex items-center justify-between mt-4">
        <span class="font-bold text-green-800">${p.price}</span>
        
        <a href="https://wa.me/917219248924?text=${msg}" 
           target="_blank"
           class="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
          Order Now
        </a>
      </div>

    </div>
  `;
}


// ================= INITIAL PAGE LOAD =================

document.addEventListener("DOMContentLoaded", () => {

  const productList = document.getElementById("product-list");
  const featured = document.getElementById("featured-products");
  const search = document.getElementById("search");

  // Render All Products
  if (productList) {
    productList.innerHTML = products.map(createProductCard).join("");
  }

  // Render Featured (First 3)
  if (featured) {
    const featuredProducts = products.slice(0, 3);
    featured.innerHTML = featuredProducts.map(createProductCard).join("");
  }

  // SEARCH FUNCTION
  if (search && productList) {
    search.addEventListener("input", () => {
      const keyword = search.value.toLowerCase();

      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.desc.toLowerCase().includes(keyword)
      );

      productList.innerHTML = filtered.map(createProductCard).join("");
    });
  }

  // ================= STAR RATING =================

  const starContainer = document.getElementById("starRating");

  if (starContainer) {
    const stars = starContainer.querySelectorAll("span");

    stars.forEach(star => {
      star.classList.add("text-gray-400"); // default color

      star.addEventListener("click", () => {
        selectedRating = parseInt(star.getAttribute("data-value"));

        stars.forEach(s => {
          const value = parseInt(s.getAttribute("data-value"));

          if (value <= selectedRating) {
            s.textContent = "★";
            s.classList.remove("text-gray-400");
            s.classList.add("text-yellow-500"); // GOLD color
          } else {
            s.textContent = "☆";
            s.classList.remove("text-yellow-500");
            s.classList.add("text-gray-400");
          }
        });
      });
    });
  }

  // Load reviews on page load
  loadReviews();
});


// ================= SUPABASE CONFIG =================

// const supabaseUrl = "https://tdpqappqxoufohoutbfj.supabase.co";
// const supabaseKey = "sb_publishable_AxGXKvrQhfOL9FZvO3miMw_DGY3mkVB";

// const supabaseClient = window.supabase.createClient(
//   supabaseUrl,
//   supabaseKey
// );

// ================= LOAD REVIEWS =================
let reviews = [];
async function loadReviews() {

  try {

    const response = await fetch("http://localhost:5000/reviews");
    // const response = await fetch("https://brahmyayurved-backend.onrender.com/reviews"); // Production

    const data = await response.json();

    // store globally for gallery modal filtering
    reviews = data || [];

    console.log("Reviews loaded:", reviews);

    // Review count
    const countEl = document.getElementById("reviewCount");
    if (countEl) {
      countEl.innerText = `(${reviews.length})`;
    }

    /* ===============================
       TESTIMONIAL PAGE SECTION
    =============================== */

    const reviewsDiv = document.getElementById("reviews");
    const galleryDiv = document.getElementById("review-gallery");

    /* ---------- IMAGE GALLERY (8 preview + more tile) ---------- */
    if (galleryDiv) {

      galleryDiv.innerHTML = "";

      // only reviews with images
      let imageReviews = reviews.filter(r => r.image_url);

      const maxPreview = 7;

      // show first 8 images
      imageReviews.slice(0, maxPreview).forEach(review => {

        const img = document.createElement("img");
        const fileName = review.image_url.split("/").pop();
        img.src = `http://localhost:5000/review-image/${fileName}`;
        img.className =
          "w-full h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition";

        img.onclick = () => openModal(review);

        galleryDiv.appendChild(img);
      });

      // "+X more" tile
      if (imageReviews.length > maxPreview) {

        const moreDiv = document.createElement("div");

        moreDiv.className =
          "flex items-center justify-center bg-gray-200 h-24 rounded-lg text-lg font-semibold cursor-pointer hover:bg-gray-300";

        moreDiv.innerText = `+${imageReviews.length - maxPreview}`;

        moreDiv.onclick = openFullGallery;

        galleryDiv.appendChild(moreDiv);
      }
    }

    /* ---------- REVIEWS LIST ---------- */
    if (reviewsDiv) {

      reviewsDiv.innerHTML = reviews.map(r => {

        const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);

        return `
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <h4 class="font-semibold text-lg">${r.name}</h4>
              <span class="text-yellow-500 text-lg">${stars}</span>
            </div>

            <p class="mt-3 text-stone-700">
              ${r.review_comment || ""}
            </p>
          </div>
        `;
      }).join("");
    }

    /* ===============================
       HOME PAGE SECTION
    =============================== */

    const homeReviews = document.getElementById("home-reviews");

    if (homeReviews) {
      renderHomeReviews(reviews, homeReviews);
    }

  } catch (err) {
    console.error("Failed to load reviews:", err);
  }
}


// ================= ADD REVIEW WITH IMAGE =================

let selectedRating = 0;

const stars = document.querySelectorAll("#starRating span");
stars.forEach(s => s.textContent = "☆");

async function addReview() {

  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const imageFile = document.getElementById("reviewImage").files[0];
  const product = document.getElementById("productSelect").value;

  if (!name || selectedRating === 0) {
    alert("Please add name and rating");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("rating", selectedRating);
  formData.append("review_comment", text);
  formData.append("product", product);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    alert("Review submitted successfully!");

    document.getElementById("name").value = "";
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewImage").value = "";
    document.getElementById("imagePreview").classList.add("hidden");

    selectedRating = 0;
    resetStars();
    loadReviews();


  } catch (err) {
    console.error(err);
    alert("Failed to submit review");
  }
}

function resetStars() {
  const stars = document.querySelectorAll("#starRating span");

  stars.forEach(star => {
    star.textContent = "☆";
    star.classList.remove("text-yellow-500");
    star.classList.add("text-gray-400");
  });
}

// ================= HOME REVIEW SCROLLER =================

function renderHomeReviews(reviews, container) {

  const reviewHTML = reviews.map(r => {
    const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
    const fileName = r.image_url.split("/").pop();
    return `
  <div class="bg-white p-6 rounded-lg shadow lg:col-span-3">
    
    <div class="flex gap-4 items-start">
      
      <!-- LEFT CONTENT -->
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h4 class="font-semibold">${r.name}</h4>
          <span class="text-yellow-500">${stars}</span>
        </div>

        <p class="mt-3 text-stone-700 line-clamp-3">
          ${r.review_comment}
        </p>
      </div>

      <!-- RIGHT IMAGE -->
      ${r.image_url ? `
        <div class="w-20 h-20 flex-shrink-0">
          <img src="http://localhost:5000/review-image/${fileName}" 
               class="w-full h-full object-cover rounded-lg">
        </div>
      ` : ""}

    </div>

  </div>
`;
  }).join("");

  if (reviews.length <= 3) {
    container.classList.remove("animate-scroll");
    container.innerHTML = reviewHTML;
    return;
  }

  container.classList.add("animate-scroll");
  container.innerHTML = reviewHTML + reviewHTML;
}

// ================= IMAGE PREVIEW =================

function initImagePreview() {
  const images = document.querySelectorAll("#review-gallery img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      document.getElementById("modalImage").src = img.src;
      document.getElementById("modalName").innerText = "Uploaded by: " + img.dataset.name;
      document.getElementById("modalDate").innerText = "On: " + img.dataset.date;
      // ⭐ RATING
      const stars =
        "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

      document.getElementById("modalRating").innerText = stars;

      // REVIEW TEXT
      document.getElementById("modalReview").innerText =
        review.review_comment;

      document.getElementById("imageModal").classList.remove("hidden");
      document.getElementById("imageModal").classList.add("flex");
    });
  });
}

function openModal(review) {
  const fileName = review.image_url.split("/").pop();
  document.getElementById("modalImage").src = `http://localhost:5000/review-image/${fileName}`;
  document.getElementById("modalName").innerText = "Uploaded by: " + review.name;
  document.getElementById("modalDate").innerText = "On: " + review.created_at;
  // ⭐ RATING
      const stars =
        "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

      document.getElementById("modalRating").innerText = stars;

      // REVIEW TEXT
      document.getElementById("modalReview").innerText =
        review.review_comment;

  document.getElementById("imageModal").classList.remove("hidden");
  document.getElementById("imageModal").classList.add("flex");
}

function closeModal() {
  document.getElementById("imageModal").classList.add("hidden");
  document.getElementById("imageModal").classList.remove("flex");
  const gallery = document.getElementById("fullGalleryContent");
  if (gallery) gallery.classList.remove("blur-sm", "scale-[0.98]", "opacity-70");
}

function openFullGallery() {
  document.getElementById("fullGalleryModal").classList.remove("hidden");
  loadFullGallery("all");
}

function closeFullGallery() {
  document.getElementById("fullGalleryModal").classList.add("hidden");
  const gallery = document.getElementById("fullGalleryModal");
}

function loadFullGallery(filter) {

  const grid = document.getElementById("fullGalleryGrid");
  grid.innerHTML = "";

  reviews.forEach(r => {

    if (!r.image_url) return;

    if (filter !== "all" && r.product !== filter) return;

    const img = document.createElement("img");
    const fileName = r.image_url.split("/").pop();
    img.src = `http://localhost:5000/review-image/${fileName}`;
    img.className = "w-full h-40 object-cover rounded cursor-pointer";
    img.onclick = () => {

      // hide full gallery first
      const gallery = document.getElementById("fullGalleryContent");
      if (gallery) {
        if (gallery) gallery.classList.add("blur-sm", "scale-[0.98]", "opacity-70");
      }

      openModal(r)
    };

    grid.appendChild(img);
  });
}

function filterGallery() {
  const value = document.getElementById("galleryFilter").value;
  loadFullGallery(value);
}