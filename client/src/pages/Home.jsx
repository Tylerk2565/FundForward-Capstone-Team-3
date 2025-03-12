const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#009895] text-white teext-center py-20 px-6">
        <h1 className="text-4xl font-bold">
          Make a Difference with FundForward
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          {" "}
          Your time and donations can create lasting changes in communities that
          need it most. Explore local projects, volunteer, and contribute to
          meaningful causes.{" "}
        </p>
      </section>
      {/* Quiz Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center">
          Find Projects Based on Your Interests
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Take our short quiz to discover projects aligned with your passions.
        </p>
        <div className="mt-6 flex justify-center">
          <button>Take the Quiz</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
