<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'username' => 'admin',
            'password' => password_hash('admin', PASSWORD_DEFAULT), // hash for security
            'created_at' => date('Y-m-d H:i:s'),
        ];

        // Insert data into the 'users' table
        $this->db->table('users')->insert($data);
    }
}
