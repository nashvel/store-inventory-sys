import { Link } from "react-router-dom";
import SideMenu from "../../layouts/sidemenu";
import cokeImage from "../../assets/coke.png";
import virginImage from "../../assets/virgin.png";
import pepsiImage from "../../assets/pepsi.png";
import royalImage from "../../assets/royal.png";
import spriteImage from "../../assets/sprite.png";
import waterImage from "../../assets/water.png";
import sardinesImage from "../../assets/sardines.png";
import mountainedewImage from "../../assets/mountaindew.png";
import { useState, useEffect } from "react";

function ProductList() {
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/your-ci-project/index.php/api/products")
      .then((res) => res.json())
      .then((data) => setFetchedProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Hardcoded products
  const staticProducts = [
    {
      id: 1,
      name: "Coca-Cola",
      price: 20,
      description: "Soft drink",
      image: cokeImage,
      isNew: true,
    },
    {
      id: 2,
      name: "Virgin",
      price: 5,
      description: "Soft Drinks",
      image: virginImage,
      isNew: true,
    },
    {
      id: 3,
      name: "Pepsi",
      price: 25,
      description: "Soft Drinks",
      image: pepsiImage,
      isNew: false,
    },
    {
      id: 4,
      name: "Royal",
      price: 25,
      description: "Soft Drinks",
      image: royalImage,
      isNew: false,
    },
    {
      id: 5,
      name: "Sprite",
      price: 25,
      description: "Soft Drinks",
      image: spriteImage,
      isNew: false,
    },
    {
      id: 6,
      name: "Water",
      price: 20,
      description: "Soft Drinks",
      image: waterImage,
      isNew: false,
    },
    {
      id: 7,
      name: "Sardines",
      price: 20,
      description: "Sardines",
      image: sardinesImage,
      isNew: false,
    },
    {
      id: 8,
      name: "Mountain Dew",
      price: 20,
      description: "Soft Drinks",
      image: mountainedewImage,
      isNew: false,
    },
  ];

  // Combine static and fetched products
  const products = [...staticProducts, ...fetchedProducts];

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

        {/* Conditionally render Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-12 gap-x-6 mt-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12"
              >
                <div className="box card-style-2 shadow-xl relative">
                  {product.isNew && (
                    <div className="absolute top-2 left-2">
                      <div className="badge bg-info text-white">New</div>
                    </div>
                  )}

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
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <div className="mt-2 text-primary font-bold">
                      ₱{product.price.toFixed(2)}
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
