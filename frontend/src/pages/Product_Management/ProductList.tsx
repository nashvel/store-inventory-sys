import { Link } from "react-router-dom";
import SideMenu from "../../layouts/sidemenu";
import { useState, useEffect } from "react";

// Define TypeScript interface for products
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
}

function ProductList() {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setFetchedProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const products = fetchedProducts;

  return (
    <div className="main-content app-content">
      <div className="container-fluid">
        <SideMenu />

        {/* Top Summary */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xl:col-span-12 col-span-12">
            <div className="box">
              <div className="box-body px-4 py-3">
                <div className="grid grid-cols-12 gap-x-6 items-center gap-y-2">
                  <div className="sm:col-span-8 col-span-12">
                    <h6 className="mb-0">
                      Total{" "}
                      <span className="font-semibold text-primarytint1color">
                        {products.length} ITEMS
                      </span>{" "}
                      Available
                    </h6>
                  </div>

                  {/* Add Product Button */}
                  <div className="sm:col-span-4 col-span-12 text-right">
                    <Link to="/Productadd">
                      <button className="bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-primary/80">
                        + Add Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-12 gap-x-6 mt-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12"
              >
                <div className="box card-style-2 shadow-xl relative">
                  <div className="card-img-top border-b border-dashed bg-light h-40 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>

                  <div className="p-4">
                    <h5 className="font-semibold mb-1">{product.name}</h5>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="mt-2 text-primary font-bold">
                      ₱{Number(product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-500">
            No products available. Please add some products.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
