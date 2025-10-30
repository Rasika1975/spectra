const VisionMission = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Vision & Mission</h1>
            <p className="text-xl">The driving force behind Spectra Community.</p>
          </div>
        </section>
  
        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h2 className="text-3xl font-bold text-purple-600 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To create a connected and collaborative college ecosystem where every student has the opportunity to discover their passion, develop their skills, and make a meaningful impact. We envision a community where information flows freely, and every member feels empowered to participate and grow.
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-indigo-600 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to provide a centralized digital platform that bridges the gap between students, clubs, and college activities. We aim to:
              </p>
              <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-4 space-y-2">
                <li>Empower student clubs with tools to manage their activities, members, and outreach effectively.</li>
                <li>Provide students with easy access to information about events, workshops, and communities.</li>
                <li>Foster a culture of knowledge-sharing through a collaborative blogging platform.</li>
                <li>Enhance engagement and participation in extracurricular activities to enrich the student experience.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default VisionMission;