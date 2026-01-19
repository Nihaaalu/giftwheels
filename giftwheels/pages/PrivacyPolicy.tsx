
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <header className="mb-16 border-l-4 border-accent pl-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">PRIVACY POLICY & STORE POLICIES</h1>
        <p className="text-accent font-bold tracking-widest mt-2 uppercase">Official GiftWheels Guidelines</p>
      </header>

      <div className="space-y-12 text-textSecondary leading-relaxed">
        {/* PRIVACY POLICY */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 border-b border-border pb-2">PRIVACY POLICY</h2>
          <div className="space-y-4">
            <p>
              At GiftWheels, we respect your privacy and are committed to protecting your personal information.
            </p>
            <p>
              We collect only the information necessary to process and manage orders, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customer name</li>
              <li>Contact number</li>
              <li>Shipping address</li>
            </ul>
            <p>
              This information is used strictly for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Order confirmation</li>
              <li>Stock management</li>
              <li>Customer communication regarding orders</li>
            </ul>
            <p>
              We do NOT sell, share, or trade customer data with third parties under any circumstances, except when required by law.
            </p>
            <p>
              GiftWheels does NOT collect, store, or process any online payment or card-related information.
            </p>
          </div>
        </section>

        {/* ORDER & COMMUNICATION POLICY */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 border-b border-border pb-2">ORDER & COMMUNICATION POLICY</h2>
          <div className="space-y-4">
            <p>
              GiftWheels does not support online payments through the website.
            </p>
            <p>
              All orders placed on the website are treated as order requests. After an order is placed:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Stock is updated in real time</li>
              <li>Our team contacts the customer directly using the provided contact details</li>
              <li>Payment and delivery are coordinated manually</li>
            </ul>
          </div>
        </section>

        {/* SHIPPING & DELIVERY POLICY */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 border-b border-border pb-2">SHIPPING & DELIVERY POLICY</h2>
          <div className="space-y-4">
            <p>
              Order confirmation is done after manual verification.
            </p>
            <p>
              Orders are usually processed and dispatched within 1–2 business days after confirmation.
            </p>
            <p>
              Estimated delivery timelines depend on location and courier availability.
            </p>
            <p>
              Tracking details are shared directly with the customer once the order is shipped.
            </p>
          </div>
        </section>

        {/* CANCELLATION & REFUND POLICY */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 border-b border-border pb-2">CANCELLATION & REFUND POLICY</h2>
          <div className="space-y-4">
            <p>
              Orders cannot be cancelled once confirmed by our team.
            </p>
            <p>
              Refunds or replacements are considered only in cases where:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The product is received damaged</li>
              <li>The product is defective</li>
            </ul>
            <p>
              Such issues must be reported immediately with valid proof through official contact channels.
            </p>
          </div>
        </section>

        {/* DATA SECURITY */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 border-b border-border pb-2">DATA SECURITY</h2>
          <div className="space-y-4">
            <p>
              Customer data is stored securely and accessed only for order-related purposes.
            </p>
            <p>
              We take reasonable measures to prevent unauthorized access or misuse of customer information.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 border-b border-border pb-2">CONTACT</h2>
          <p>
            For any questions related to privacy, orders, or policies, customers can contact GiftWheels through the official contact details listed on the website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
