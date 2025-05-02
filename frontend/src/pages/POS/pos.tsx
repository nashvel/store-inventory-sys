import React, { useState, useEffect, useRef, useMemo } from "react";
import SideMenu from "../../layouts/sidemenu";
import virginImage from "../../assets/virgin.png";
import cokeImage from "../../assets/coke.png";
import cheetosImage from "../../assets/cheetos.png";
import mountaindewImage from "../../assets/mountaindew.png";
import pepsiImage from "../../assets/pepsi.png";
import royalImage from "../../assets/royal.png";
import spriteImage from "../../assets/sprite.png";
import sunkistImage from "../../assets/Sunkist.png";

const Pos = () => {
  const categories = ["All", "Drinks", "Snacks", "Groceries", "Canned Goods", "Health & Beauty"];

  // Product data for now (replace with backend fetch later)
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
      const category = categories[Math.floor(Math.random() * (categories.length - 1)) + 1]; // skip "All"
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

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  useEffect(() => {
    if (quantityInputRef.current) quantityInputRef.current.focus();
  }, [selectedProduct]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: "flex", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <div style={{ width: "250px", backgroundColor: "#fff", borderRight: "1px solid #eee" }}>
        <SideMenu />
      </div>

      <div style={{ flex: 1, padding: "20px", display: "flex", gap: "20px" }}>
        {/* Product Section */}
        <div style={{ flex: 3 }}>
          <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>🛍️ Products</h2>

          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "16px",
              fontSize: "15px"
            }}
          />

          <div style={{ marginBottom: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  backgroundColor: activeCategory === category ? "#007bff" : "#fff",
                  color: activeCategory === category ? "#fff" : "#333",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px"
          }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  padding: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src={product.image} alt={product.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                <strong style={{ fontSize: "14px" }}>{product.name}</strong>
                <span style={{ color: "#555", fontSize: "13px", marginTop: "4px" }}>₱{product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Section */}
        <div style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
          position: "sticky",
          top: "20px",
          maxHeight: "90vh",
          overflowY: "auto"
        }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>🧾 Checkout</h2>
          {cart.length === 0 ? (
            <p style={{ color: "#888" }}>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={e => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                      style={{
                        width: "60px", marginTop: "5px", padding: "6px", borderRadius: "6px", border: "1px solid #ccc"
                      }}
                    />
                    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666" }}>
                      Subtotal: ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    title="Remove"
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "20px",
                      color: "#999",
                      cursor: "pointer",
                      marginLeft: "10px"
                    }}
                  >🗑️</button>
                </div>
              </div>
            ))
          )}
          <hr />
          <div style={{ fontWeight: "bold", fontSize: "18px", marginTop: "10px" }}>
            Total: ₱{total.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "Enter") addToCart();
          }}
        >
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            width: "320px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            position: "relative"
          }}>
            <button
              onClick={closeModal}
              style={{
                position: "absolute", top: "12px", right: "12px", border: "none", background: "transparent", fontSize: "20px", cursor: "pointer"
              }}
            >×</button>
            <h3 style={{ marginBottom: "10px" }}>{selectedProduct.name}</h3>
            <p style={{ marginBottom: "10px", fontSize: "14px", color: "#555" }}>{selectedProduct.description}</p>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>₱{selectedProduct.price.toFixed(2)}</p>
            <input
              ref={quantityInputRef}
              type="number"
              value={quantity}
              min={1}
              onChange={e => setQuantity(parseInt(e.target.value) || 1)}
              style={{
                width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px", marginBottom: "12px"
              }}
            />
            <button
              onClick={addToCart}
              disabled={quantity < 1}
              style={{
                width: "100%", padding: "12px", backgroundColor: "#007bff", color: "#fff", border: "none",
                borderRadius: "8px", fontSize: "16px", cursor: "pointer", opacity: quantity < 1 ? 0.5 : 1
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pos;
