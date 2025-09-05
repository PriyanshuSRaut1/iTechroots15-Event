import React, { useState } from "react";
import axios from "axios";

const RazorpayOneRupee = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setShowPopup(true); // open custom modal
    script.onerror = () => alert("Razorpay SDK failed to load");
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    try {
      const { data: order } = await axios.post("http://localhost:5000/create-order");

      const options = {
        key: "rzp_live_Ko0DZ4dV4DOY1t",
        amount: order.amount,
        currency: order.currency,
        name: "Hackathon 2025",
        description: "Participation Fee for Hackathon 2025 - ₹1 Only",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verification = await axios.post("http://localhost:5000/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verification.data.success) {
              setMessage("✅ Payment successful for Hackathon!");
            } else {
              setMessage("❌ Payment verification failed.");
            }
          } catch (error) {
            setMessage("❌ Error during payment verification.");
          }
        },
        prefill: {
          name: "priyanshu raut",
          email: "priyanshu@example.com",
          contact: "9511959183",
        },
        theme: {
          color: "#121212",
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
          emi: false,
          paylater: false,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setShowPopup(false); // close custom modal
    } catch (err) {
      alert("Payment failed to initialize");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Pay ₹1 via UPI</h1>

      <button
        onClick={loadRazorpay}
        className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 transition"
      >
        Pay ₹1
      </button>

      {message && <div className="mt-6 text-lg text-center">{message}</div>}

      {/* Custom Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm ₹1 Payment</h2>
            <p className="mb-6 text-center">You will be redirected to Razorpay payment gateway.</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                onClick={handlePayment}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RazorpayOneRupee;
