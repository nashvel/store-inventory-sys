import { useEffect } from "react";
import logo from "../assets/logo.png";

function CartPage() {
  // Sample cart items (replace with real data or state later)
  const cartItems = [
    { id: 1, name: "Product A", quantity: 2, price: 49.99 },
    { id: 2, name: "Product B", quantity: 1, price: 29.99 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    document.title = "Cart | MotoPOS";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-500">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo" className="mx-auto h-20 animate__animated animate__zoomIn" />
          <h1 className="text-3xl font-extrabold text-gray-800 mt-4">Your Cart</h1>
          <p className="text-sm text-gray-600 mt-1">Review your selected items before checkout.</p>
        </div>

        <div className="space-y-4 px-4 max-h-96 overflow-y-auto animate__animated animate__fadeIn animate__delay-1s">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right text-gray-800 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 px-4 text-right text-lg font-bold text-gray-800">
          Total: ${total.toFixed(2)}
        </div>

        <div className="flex justify-center mt-6 animate__animated animate__fadeIn animate__delay-1.5s">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
