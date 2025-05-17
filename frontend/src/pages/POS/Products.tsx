import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "../../layouts/sidemenu";
import Checkout from "./Checkout";
import "./Product.css";
import toast from "react-hot-toast"

interface Product {
  id: number;
  name: string;
  image: string | null;
  price: number;
  description: string;
  category: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Pos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const quantityInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  useEffect(() => {
    if (quantityInputRef.current) quantityInputRef.current.focus();
  }, [selectedProduct]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [filteredProducts]);

  const addToCart = () => {
    if (!selectedProduct || quantity < 1) return;
    const existing = cart.find(item => item.id === selectedProduct.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([
        ...cart,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity,
        },
      ]);
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

const productCard = (product: Product) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.02 }}
    key={product.id}
    className="product-card"
  >
    <div className="product-image-container" onClick={() => setSelectedProduct(product)}>
      {product.image ? (
        <img src={product.image} alt={product.name} />
      ) : (
        <span className="no-image">No Image</span>
      )}
    </div>
    <strong>{product.name}</strong>
    <span>₱{Number(product.price).toFixed(2)}</span>

    {/* ➕ Add to cart button */}
    <button
      className="add-btn"
      onClick={(e) => {
        e.stopPropagation(); // prevent opening the modal
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
          setCart(cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ));
        } else {
          setCart([
            ...cart,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          ]);
        }

        toast.success(`Added ${product.name} to cart`);
      }}
    >
      +
    </button>
  </motion.div>
);

  return (
    <div className="pos-container">
      <div className="side-menu">
        <SideMenu />
      </div>

      <div className="pos-content">
        <h2 className="page-title">Products</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span>🔍</span>
        </div>

        <div>
          {Object.keys(groupedProducts).sort().map(category => (
            <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="category-title">{category}</h3>
              <div className="product-grid">
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

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="modal"
            >
              <h2>{selectedProduct.name}</h2>
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              ) : (
                <span className="no-image">No Image</span>
              )}
              <p>{selectedProduct.description}</p>
              <div className="modal-controls">
                <span>₱{selectedProduct.price.toFixed(2)}</span>
                <input
                  ref={quantityInputRef}
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                />
                <button onClick={addToCart}>Add to Cart</button>
              </div>
              <button className="modal-close" onClick={closeModal}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pos;
