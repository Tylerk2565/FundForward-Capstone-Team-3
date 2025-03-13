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
      {/* Why Giving Back Matters */}
      <section className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">Why Giving Back Matters</h2>
        <p className="text-gray-600 mt-4">
          Your contributions-whether through time or donations-help create
          lasting change. Supporting local projects improves education, health,
          and the environment, while strenghtening communities.
        </p>
        <div className="flex justify-center mt-6 space-x-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-700">Volunteers Engaged</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">$1M+</h3>
            <p className="text-gray-700">Funds Raised</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-700">Successful Projects</p>
          </div>
        </div>
        {/* Featured Projects */}
        <h2 className="text-2xl font-semibold mt-6">Featured Projects</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque harum
          non optio cupiditate temporibus fuga aspernatur corporis consequatur
          illum distinctio itaque eveniet asperiores perspiciatis rem eius
          similique numquam, odit atque.
        </p>
        {/* How It Works */}
        <section className="py-12 px-6 bg-gray-200 text-center mt-6">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center mt-6 space-y-6 md:space-y-0 md:space-x-12">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
              <h3 className="text-lg font-bold">Step 1</h3>
              <p className="text-gray-600 mt-2">
                Take a short quiz to discover causes that match your passions.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
              <h3 className="text-lg font-bold">Step 2</h3>
              <p className="text-gray-600 mt-2">
                Get personalized project recommendations based on your
                interests.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
              <h3 className="text-lg font-bold">Step 3</h3>
              <p className="text-gray-600 mt-2">
                Donate or volunteer to make a real impact in your community.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
