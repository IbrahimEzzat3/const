import React from "react";
import usePageTitle from "../shared/hooks/usePageTitle";
const Privacy = () => {
  usePageTitle("privacy");
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-indigo max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Consultation requests and preferences</li>
            <li>Course enrollment information</li>
            <li>Communications with us</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-gray-600 mb-4">
            We do not share your personal information with third parties except
            in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and property</li>
            <li>With service providers who assist in our operations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar tracking technologies to track activity
            on our website and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Children's Privacy
          </h2>
          <p className="text-gray-600 mb-4">
            Our services are not intended for use by children under the age of
            13. We do not knowingly collect personal information from children
            under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-600">Email: info@ecosus.com.sa</p>
            <p className="text-gray-600">Phone: +966558813386</p>
            <p className="text-gray-600">
              Address: Al-Riyadh, Saudi Arabia
            </p>
          </div>
        </section>

        <div className="mt-12 text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
