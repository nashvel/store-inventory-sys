<?php

namespace App\Controllers;

use App\Models\ProductModel;
use CodeIgniter\RESTful\ResourceController;

class ProductController extends ResourceController
{
    protected $productModel;

    public function __construct()
    {
        $this->productModel = new ProductModel();
    }

    public function index()
    {
        $products = $this->productModel
            ->select('products.*, users.username')
            ->join('users', 'users.id = products.user_id') 
            ->findAll();

        $products = array_map(function ($product) {
            $product['image'] = $product['image']
                ? base_url('images/product/' . $product['image'])
                : null;
            return $product;    
        }, $products);

        return $this->response->setJSON($products);
    }


    public function create()    
    {
        helper('filesystem');

        $json = $this->request->getJSON(true); // Decode JSON as array

        if (!$json) {
            return $this->fail('Invalid JSON input', 400);
        }

        $validation = \Config\Services::validation();

        $rules = [
            'user_id'  => 'required|is_natural_no_zero',
            'name'     => 'required',
            'category' => 'required|in_list[Electronics,Toys,Health & Beauty,Furnitures,Clothing]',
            'price'    => 'required|decimal',
            'stock'    => 'required|integer',
            'image'    => 'permit_empty|string' // base64-encoded image (optional)
        ];

        if (!$this->validateData($json, $rules)) {
            return $this->failValidationErrors($validation->getErrors());
        }

        $imageName = null;

        if (!empty($json['image'])) {
            $imageData = $json['image'];
            $imageName = uniqid() . '.png';
            $imagePath = FCPATH . 'images/product/' . $imageName;

            if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
                $imageData = substr($imageData, strpos($imageData, ',') + 1);
                $type = strtolower($type[1]);

                if (!in_array($type, ['jpg', 'jpeg', 'png'])) {
                    return $this->fail('Only JPG, JPEG, and PNG image types are allowed', 415);
                }

                $imageName = uniqid() . '.' . $type;
                $imagePath = FCPATH . 'images/product/' . $imageName;
            }

            $imageData = base64_decode($imageData);
            if ($imageData === false) {
                return $this->fail('Invalid base64 image data', 400);
            }

            if (!write_file($imagePath, $imageData)) {
                return $this->fail('Failed to save image file', 500);
            }
        }

        $this->productModel->save([
            'user_id'  => $json['user_id'],
            'name'     => $json['name'],
            'category' => $json['category'],
            'price'    => $json['price'],
            'stock'    => $json['stock'],
            'image'    => $imageName,
        ]);

        return $this->respondCreated(['message' => 'Product added successfully']);
    }
}
