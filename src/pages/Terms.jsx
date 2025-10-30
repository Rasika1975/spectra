const Terms = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>
  
        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Spectra Community. By accessing our website and using our services, you agree to be bound by these Terms of Service.
            </p>
  
            <h2>2. User Conduct</h2>
            <p>
              You agree not to use the service for any unlawful purpose or to engage in any conduct that could damage, disable, or impair the service.
            </p>
  
            <h2>3. Content</h2>
            <p>
              You are responsible for any content you post. By posting content, you grant us a non-exclusive, royalty-free license to use, reproduce, and distribute it.
            </p>
  
            <h2>4. Termination</h2>
            <p>
              We may terminate or suspend your access to our service at any time, without prior notice, for conduct that we believe violates these Terms.
            </p>
  
            {/* Add more terms as needed */}
          </div>
        </article>
      </div>
    );
  };
  
  export default Terms;