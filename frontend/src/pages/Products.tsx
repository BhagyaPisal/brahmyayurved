import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");

    // Temporary static data (later replace with API)
    useEffect(() => {
        const mockProducts: Product[] = [
            {
                id: 1,
                name: "Charcoal Soap 100gm",
                price: 99,
                description: "Targeted for tan removal and skin brightening.",
                image: "public/images/charcoal_soap.jpg"
            },
            {
                id: 2,
                name: "Sandalwood Soap 100gm",
                price: 99,
                description: "Formulated for natural glow and radiance.",
                image: "public/images/sandalwood_soap.jpg"
            },
            {
                id: 3,
                name: "Ubtan Soap 100gm",
                price: 99,
                description: "A herbal cleansing soap for a natural glow.",
                image: "public/images/ubtan_soap.jpg"
            },
            {
                id: 4,
                name: "Abhyanga Oil 50ml",
                price: 79,
                description: "Deeply moisturizes & calms the mind.",
                image: "public/images/abhyanga_oil.jpg"
            },
            {
                id: 5,
                name: "Lip Balm",
                price: 29,
                description: "Locks in moisture and prevents dryness.",
                image: "public/images/lip_balm.jpg"
            },
            {
                id: 6,
                name: "Ubtan Powder 50gm",
                price: 99,
                description: "Traditional herbal body scrub powder.",
                image: "public/images/ubtan_powder.jpg"
            },
            {
                id: 7,
                name: "Chandan Powder 30gm",
                price: 69,
                description: "Brightens skin & improves texture.",
                image: "public/images/chandan_powder.jpg"
            },
            {
                id: 8,
                name: "Multani Mitti 30gm",
                price: 39,
                description: "Natural clay for deep cleansing & oil control.",
                image: "public/images/multani_mitti.jpg"
            },
            {
                id: 9,
                name: "Hair Oil 50ml",
                price: 99,
                description: "Strengthens follicles & reduces hair fall.",
                image: "public/images/hair_oil.jpg"
            },
            {
                id: 10,
                name: "Skin Care Kit",
                price: 449,
                description: "Complete Ayurvedic skin care combo.",
                image: "public/images/skin_care_kit.jpg"
            }];

        setProducts(mockProducts);
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleWhatsAppOrder = (product: Product) => {
        const message = `Hello, I would like to order:
Product: ${product.name}
Price: ₹${product.price}`;

        const url = `https://wa.me/917219248924?text=${encodeURIComponent(
            message
        )}`;

        window.open(url, "_blank");
    };

    return (
        <section className="max-w-7xl mx-auto py-20 px-6">
            <h2 className="text-3xl font-semibold mb-10 text-stone-800">
                Our Products
            </h2>

            {/* Search */}
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-stone-300 p-3 rounded-md w-full mb-12 focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="bg-[#F5F1E8] rounded-t-2xl flex items-center justify-center h-64 p-8">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-full object-contain"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold text-stone-800">
                                {product.name}
                            </h3>

                            <p className="text-sm text-stone-600 mt-3 flex-grow">
                                {product.description}
                            </p>

                            {/* Bottom Section */}
                            <div className="flex justify-between items-center mt-6">
                                <p className="font-semibold text-green-800 text-lg">
                                    ₹{product.price}
                                </p>

                                <button
                                    onClick={() => handleWhatsAppOrder(product)}
                                    className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Products;