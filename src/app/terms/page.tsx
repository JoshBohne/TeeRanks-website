import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-green-500 hover:text-green-600 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> January 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using the TeeRank website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Waitlist Participation</h2>
            <p className="text-gray-600 mb-4">
              By joining our waitlist, you agree to receive email communications from TeeRank regarding:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>App launch notifications</li>
              <li>Feature updates and announcements</li>
              <li>Golf-related content and tips</li>
            </ul>
            <p className="text-gray-600 mb-4">
              You may unsubscribe from these communications at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              The TeeRank name, logo, and all related content are the property of TeeRank and are protected by applicable intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              TeeRank shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:hello@teeranks.com" className="text-green-500 hover:text-green-600">
                hello@teeranks.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}