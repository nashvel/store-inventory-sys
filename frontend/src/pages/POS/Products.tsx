// src/pages/Pos.tsx
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "../../layouts/sidemenu";
import Checkout from "./Checkout";

import virginImage from "../../assets/virgin.png";
import cokeImage from "../../assets/coke.png";
import cheetosImage from "../../assets/cheetos.png";
import mountaindewImage from "../../assets/mountaindew.png";
import pepsiImage from "../../assets/pepsi.png";
import royalImage from "../../assets/royal.png";
import spriteImage from "../../assets/sprite.png";
import sunkistImage from "../../assets/Sunkist.png";

const Pos = () => {
  const categories = ["All", "Electronics", "Furnitures", "Clothings", "Toys", "Health & Beauty"];

  const productData = [
    { name: "Coke", image: cokeImage, category: "Drinks" },
    { name: "Virgin", image: virginImage, category: "Drinks" },
    { name: "Cheetos", image: cheetosImage, category: "Snacks" },
    { name: "Mountain Dew", image: mountaindewImage, category: "Drinks" },
    { name: "Pepsi", image: pepsiImage, category: "Drinks" },
    { name: "Royal", image: royalImage, category: "Drinks" },
    { name: "Sprite", image: spriteImage, category: "Drinks" },
    { name: "Sunkist", image: sunkistImage, category: "Drinks" },
  ];

  const generateProducts = () => {
    const baseProducts = productData.map((item, index) => ({
      id: index + 1,
      name: item.name,
      image: item.image,
      price: parseFloat((Math.random() * 10 + 1).toFixed(2)),
      description: `Description for ${item.name}`,
      category: item.category,
    }));

    const moreProducts = [];
    for (let i = baseProducts.length + 1; i <= 100; i++) {
      const category = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
      const price = parseFloat((Math.random() * 10 + 1).toFixed(2));
      moreProducts.push({
        id: i,
        name: `${category} Product ${i}`,
        image: `https://via.placeholder.com/150?text=Product+${i}`,
        price,
        description: `Description for ${category} Product ${i}`,
        category,
      });
    }

    return [...baseProducts, ...moreProducts];
  };

  const allProducts = useMemo(() => generateProducts(), []);

  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const quantityInputRef = useRef<HTMLInputElement>(null);

  const addToCart = () => {
    if (!selectedProduct || quantity < 1) return;
    const existing = cart.find(item => item.id === selectedProduct.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...selectedProduct, quantity }]);
    }
    closeModal();
  };

  const updateCartQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCart(cart.map(item => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  useEffect(() => {
    if (quantityInputRef.current) quantityInputRef.current.focus();
  }, [selectedProduct]);

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, typeof allProducts>);
  }, [filteredProducts]);

  const productCard = (product: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      key={product.id}
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        padding: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transition: "all 0.3s ease",
        border: "1px solid #f0f0f0",
      }}
    >
      <div className="product-image-container" style={{
        width: "100%",
        height: "140px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "16px",
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: "12px",
          }}
        />
      </div>
      <strong style={{ 
        fontSize: "16px",
        color: "#2c3e50",
        marginBottom: "8px",
      }}>{product.name}</strong>
      <span style={{ 
        color: "#2ecc71",
        fontSize: "18px",
        fontWeight: "600",
        marginTop: "4px" 
      }}>₱{product.price.toFixed(2)}</span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const existing = cart.find(item => item.id === product.id);
          if (existing) {
            setCart(cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
          } else {
            setCart([...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
          }
        }}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          backgroundColor: "#3498db",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(52, 152, 219, 0.3)",
        }}
      >
        +
      </motion.button>
    </motion.div>
  );

  return (
    <div style={{ display: "flex", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ width: "250px", backgroundColor: "#fff", borderRight: "1px solid #eee" }}>
        <SideMenu />
      </div>

      <div style={{ flex: 1, padding: "24px", display: "flex", gap: "24px" }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ 
            marginBottom: "20px",
            fontSize: "28px",
            color: "#2c3e50",
            fontWeight: "600"
          }}> Products</h2>

          <div style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            alignItems: "center"
          }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 40px",
                  borderRadius: "12px",
                  border: "1px solid #e1e8ed",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
              <span style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8"
              }}>🔍</span>
            </div>
          </div>

          <div style={{ 
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            {categories.map(category => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "24px",
                  border: "none",
                  backgroundColor: activeCategory === category ? "#3498db" : "#fff",
                  color: activeCategory === category ? "#fff" : "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            {Object.keys(groupedProducts).map(category => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={category}
              >
                <h3 style={{
                  fontSize: "20px",
                  marginBottom: "16px",
                  color: "#2c3e50",
                  fontWeight: "600"
                }}>{category}</h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "20px",
                  marginBottom: "32px"
                }}>
                  <AnimatePresence>
                    {groupedProducts[category].map(product => productCard(product))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Checkout
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
              backdropFilter: "blur(4px)",
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "16px",
                width: "400px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>{selectedProduct.name}</h2>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <p>{selectedProduct.description}</p>
              <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                <span style={{ fontSize: "18px", marginRight: "10px" }}>₱{selectedProduct.price.toFixed(2)}</span>
                <input
                  ref={quantityInputRef}
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                  style={{
                    padding: "6px",
                    width: "50px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={addToCart}
                  style={{
                    marginLeft: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
              <button
                onClick={closeModal}
                style={{
                  marginTop: "20px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "18px",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pos;
