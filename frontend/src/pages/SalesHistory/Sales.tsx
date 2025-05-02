import { useState, useEffect } from "react";
import SideMenu from "../../layouts/sidemenu";
import cokeImage from "../../assets/coke.png";
// (Other image imports...)

function Sales() {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number; image: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost/your-ci-project/index.php/api/products")
      .then((res) => res.json())
      .then((data) => setFetchedProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const staticProducts = [
    { id: 1, name: "Coca-Cola", price: 20, image: cokeImage },
    // Add the rest of the static products...
  ];

  const products = [...staticProducts, ...fetchedProducts];

  const addToCart = (product: any) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="main-content app-content">
      <div className="container-fluid">
        <SideMenu />

        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 mt-6">
          <div className="xl:col-span-8">
            <h2 className="text-2xl font-bold mb-4">Sales Transaction</h2>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-8 col-span-12 grid grid-cols-12 gap-4">
            {products.map((product) => (
              <div key={product.id} className="col-span-6 md:col-span-4 xl:col-span-3">
                <div
                  className="box card-style-2 shadow-lg cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="card-img-top bg-light h-32 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="h-full object-contain" />
                  </div>
                  <div className="p-3">
                    <h5 className="font-semibold">{product.name}</h5>
                    <div className="text-primary font-bold">₱{product.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="xl:col-span-4 col-span-12">
            <div className="box p-4 shadow-lg">
              <h4 className="font-bold mb-3">Cart</h4>
              {cart.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                <ul className="divide-y">
                  {cart.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ₱{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          className="text-red-500 text-xs mt-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Total and Checkout */}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₱{getTotal().toFixed(2)}</span>
                </div>
                <button
                  className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary/80"
                  disabled={cart.length === 0}
                >
                  Complete Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
