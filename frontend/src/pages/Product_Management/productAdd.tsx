import React, { useState } from 'react';
import SideMenu from "../../layouts/sidemenu";

interface ProductData {
  image: File | null;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
}

const ProductAdd = () => {
  const [productData, setProductData] = useState<ProductData>({
    image: null,
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setProductData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Data:', productData);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideMenu />

      {/* Main Content */}
      <main className="flex-1 flex justify-center ml-48 p-6 transition-all duration-300">
        <form
          onSubmit={handleSubmit}
          className="w-250 bg-white p-6 rounded-2xl shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Product</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Coca-Cola"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₱)</label>
            <input
              type="number"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: parseFloat(e.target.value) })
              }
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 25.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Beverage"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={productData.stock}
              onChange={(e) =>
                setProductData({ ...productData, stock: parseInt(e.target.value) })
              }
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 500ml bottled soda"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-xl file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-xl border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Submit Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProductAdd;
