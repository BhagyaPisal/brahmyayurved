import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="bg-[#F4EFE6] text-stone-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#CFE3D4] to-[#E9DDBF] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-green-900 mb-4">
          About Brahmyayurved
        </h1>
        <p className="max-w-2xl mx-auto text-stone-700 text-lg">
          A small initiative started with passion, inspired by traditional Ayurvedic values.
        </p>
      </section>

      {/* Our Journey */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold text-green-900 mb-8">
          Our Journey
        </h2>

        <div className="space-y-6 leading-relaxed text-stone-700">
          <p>
            Brahmyayurved was started in 2019 by three students who shared
            a common desire — to build something meaningful. With curiosity
            about traditional wellness practices and a passion to create,
            we began exploring the potential of authentic Ayurvedic products.
          </p>

          <p>
            What started as a small initiative gradually turned into a
            focused effort to provide simple, natural formulations to
            customers who value traditional care.
          </p>

          <p>
            Over time, we have continued to improve our processes,
            listen to customer feedback, and maintain consistency in quality.
            Our journey has been steady, and we remain committed to growing
            responsibly while staying true to our roots.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-green-900 mb-12 text-center">
          What We Believe In
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center hover:shadow-md transition">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Natural Ingredients
            </h3>
            <p className="text-sm text-stone-600">
              We focus on plant-based ingredients and avoid unnecessary additives.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center hover:shadow-md transition">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Traditional Inspiration
            </h3>
            <p className="text-sm text-stone-600">
              Our approach is guided by established Ayurvedic principles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center hover:shadow-md transition">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Customer Trust
            </h3>
            <p className="text-sm text-stone-600">
              We value honest communication and long-term relationships.
            </p>
          </div>

        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-900 mb-6">
            Our Approach
          </h2>

          <p className="text-stone-700 leading-relaxed">
            We believe in steady progress rather than rapid expansion.
            Our focus remains on maintaining quality, refining formulations,
            and delivering products that align with our original purpose —
            authentic and accessible Ayurvedic care.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-2xl font-semibold text-green-900 mb-6">
          Discover Our Products
        </h3>

        <Link
          to="/products"
          className="inline-block bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition"
        >
          View Products
        </Link>
      </section>

    </div>
  );
};

export default About;