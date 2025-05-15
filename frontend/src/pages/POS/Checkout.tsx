// src/components/Checkout.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cart: CartItem[];
  updateCartQuantity: (id: number, newQty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, updateCartQuantity, removeFromCart, clearCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing checkout...',
        success: () => {
          clearCart();
          return 'Checkout completed successfully!';
        },
        error: 'Something went wrong during checkout.',
      }
    );
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared successfully');
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  return (
    <div style={{
      flex: 1,
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      position: "sticky",
      top: "20px",
      maxHeight: "90vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column"
    }}>
      <h2 style={{ 
        fontSize: "24px", 
        marginBottom: "20px",
        color: "#2c3e50",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <span>Cart</span>
      </h2>

      <div style={{ flex: 1, marginBottom: "20px" }}>
        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                color: "#94a3b8",
                textAlign: "center",
                padding: "40px 20px"
              }}
            >
              <span style={{ fontSize: "40px" }}>🛒</span>
              <p style={{ marginTop: "16px" }}>Your cart is empty</p>
            </motion.div>
          ) : (
            cart.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  marginBottom: "16px",
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: "600",
                      color: "#334155" 
                    }}>{item.name}</p>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "8px" 
                    }}>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={e => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                        style={{
                          width: "60px",
                          padding: "8px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#fff"
                        }}
                      />
                      <p style={{ 
                        margin: 0,
                        fontSize: "14px",
                        color: "#64748b"
                      }}>
                        × ₱{item.price.toFixed(2)}
                      </p>
                      <p style={{ 
                        margin: 0,
                        fontWeight: "600",
                        color: "#334155"
                      }}>
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove"
                    style={{
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                      color: "#ef4444",
                      marginLeft: "12px"
                    }}
                  >
                    🗑️
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div style={{
        borderTop: "2px dashed #e2e8f0",
        paddingTop: "20px",
        marginTop: "auto"
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#334155"
        }}>
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClearCart}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#fee2e2",
              color: "#ef4444",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease"
            }}
          >
            Clear Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={cart.length === 0}
            style={{
              flex: 2,
              padding: "12px",
              backgroundColor: cart.length === 0 ? "#94a3b8" : "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease"
            }}
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
