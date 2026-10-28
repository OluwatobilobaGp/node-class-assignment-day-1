{
    "platform": "CampusStore API",
    "version": "1.0.0",
    "lastUpdated": "2026-10-14",
    "stats": {
        "totalUsers": 5,
        "totalProducts": 6,
        "totalOrders": 4
    },
    "users": [{
            "id": "usr_101",
            "name": "Oluwatobiloba Asaolu",
            "role": "Instructor",
            "email": "gp.asaolu@example.com",
            "isActive": true,
            "enrolledCourses": ["React Native Masterclass", "Node.js Backend Architecture"],
            "address": {
                "city": "Ikorodu",
                "state": "Lagos",
                "country": "Nigeria",
                "zipCode": "104101"
            },
            "preferences": {
                "theme": "dark",
                "notifications": true,
                "currency": "NGN"
            }
        },
        {
            "id": "usr_102",
            "name": "Asaolu Victoria",
            "role": "Student",
            "email": "victoria.a@example.com",
            "isActive": true,
            "enrolledCourses": ["Introduction to Web Dev", "UI/UX Fundamentals"],
            "address": {
                "city": "Ikeja",
                "state": "Lagos",
                "country": "Nigeria",
                "zipCode": "100271"
            },
            "preferences": {
                "theme": "light",
                "notifications": false,
                "currency": "NGN"
            }
        },
        {
            "id": "usr_103",
            "name": "Chidi Okoye",
            "role": "Student",
            "email": "chidi.o@example.com",
            "isActive": false,
            "enrolledCourses": ["Python & Django APIs"],
            "address": {
                "city": "Enugu",
                "state": "Enugu",
                "country": "Nigeria",
                "zipCode": "400102"
            },
            "preferences": {
                "theme": "dark",
                "notifications": true,
                "currency": "NGN"
            }
        },
        {
            "id": "usr_104",
            "name": "Amina Bello",
            "role": "Student",
            "email": "amina.b@example.com",
            "isActive": true,
            "enrolledCourses": ["React Native Masterclass", "Python & Django APIs"],
            "address": {
                "city": "Abuja",
                "state": "FCT",
                "country": "Nigeria",
                "zipCode": "900108"
            },
            "preferences": {
                "theme": "system",
                "notifications": true,
                "currency": "NGN"
            }
        },
        {
            "id": "usr_105",
            "name": "John Adebayo",
            "role": "Moderator",
            "email": "john.a@example.com",
            "isActive": true,
            "enrolledCourses": ["Node.js Backend Architecture"],
            "address": {
                "city": "Ibadan",
                "state": "Oyo",
                "country": "Nigeria",
                "zipCode": "200284"
            },
            "preferences": {
                "theme": "dark",
                "notifications": false,
                "currency": "NGN"
            }
        }
    ],
    "products": [{
            "id": "prod_001",
            "title": "Ergonomic Mechanical Keyboard",
            "category": "Hardware",
            "price": 45000,
            "inStock": true,
            "stockCount": 14,
            "rating": 4.8,
            "tags": ["productivity", "hardware", "wireless"],
            "supplier": {
                "name": "TechGear Hub",
                "verified": true
            }
        },
        {
            "id": "prod_002",
            "title": "Adjustable Laptop Stand",
            "category": "Hardware",
            "price": 18500,
            "inStock": true,
            "stockCount": 32,
            "rating": 4.5,
            "tags": ["workspace", "ergonomics"],
            "supplier": {
                "name": "Workspace Essentials",
                "verified": true
            }
        },
        {
            "id": "prod_003",
            "title": "Full-Stack Web Development Handbook",
            "category": "Books",
            "price": 12000,
            "inStock": false,
            "stockCount": 0,
            "rating": 4.9,
            "tags": ["education", "programming", "books"],
            "supplier": {
                "name": "DevPress",
                "verified": false
            }
        },
        {
            "id": "prod_004",
            "title": "Noise-Cancelling Bluetooth Headset",
            "category": "Audio",
            "price": 35000,
            "inStock": true,
            "stockCount": 8,
            "rating": 4.2,
            "tags": ["audio", "wireless", "music"],
            "supplier": {
                "name": "SoundWave NG",
                "verified": true
            }
        },
        {
            "id": "prod_005",
            "title": "USB-C Multi-Port Hub Adapter",
            "category": "Hardware",
            "price": 15000,
            "inStock": true,
            "stockCount": 45,
            "rating": 4.6,
            "tags": ["accessories", "hardware"],
            "supplier": {
                "name": "TechGear Hub",
                "verified": true
            }
        },
        {
            "id": "prod_006",
            "title": "Portable 10000mAh Power Bank",
            "category": "Power",
            "price": 22000,
            "inStock": true,
            "stockCount": 19,
            "rating": 4.7,
            "tags": ["power", "mobile", "travel"],
            "supplier": {
                "name": "VoltTech",
                "verified": true
            }
        }
    ],
    "orders": [{
            "orderId": "ord_901",
            "userId": "usr_101",
            "items": [
                { "productId": "prod_001", "quantity": 1 },
                { "productId": "prod_005", "quantity": 2 }
            ],
            "totalAmount": 75000,
            "status": "Delivered",
            "orderDate": "2026-10-01T10:30:00Z"
        },
        {
            "orderId": "ord_902",
            "userId": "usr_102",
            "items": [
                { "productId": "prod_002", "quantity": 1 },
                { "productId": "prod_006", "quantity": 1 }
            ],
            "totalAmount": 40500,
            "status": "Processing",
            "orderDate": "2026-10-10T14:15:00Z"
        },
        {
            "orderId": "ord_903",
            "userId": "usr_104",
            "items": [
                { "productId": "prod_004", "quantity": 1 }
            ],
            "totalAmount": 35000,
            "status": "Shipped",
            "orderDate": "2026-10-12T09:00:00Z"
        },
        {
            "orderId": "ord_904",
            "userId": "usr_105",
            "items": [
                { "productId": "prod_001", "quantity": 1 },
                { "productId": "prod_003", "quantity": 1 }
            ],
            "totalAmount": 57000,
            "status": "Cancelled",
            "orderDate": "2026-09-28T16:45:00Z"
        }
    ]
}