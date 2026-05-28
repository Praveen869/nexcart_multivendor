# 🌟 NexCart - Premium Multi-Vendor E-Commerce Platform 🌟

NexCart is a highly scalable, robust, and feature-rich **MERN Stack Multi-Vendor Marketplace** designed to bridge the gap between buyers, sellers, and platform administrators. Built with a modern responsive UI, real-time communication capabilities, and advanced analytics dashboards, NexCart delivers a state-of-the-art online shopping experience.

---

## 🚀 Key Features

### 👤 1. For Customers (Buyers)
*   **Secure Authentication**: Dual authentication flow (Email validation, Profile Photo upload).
*   **Smart Product Discovery**: Responsive search bar, category filters, and best-selling sorting.
*   **Cart & Wishlist**: Interactive cart management and customizable wishlist.
*   **Checkout & Secure Payments**: Integrated with **Stripe (Card Payments)**, **PayPal**, and **Cash on Delivery (COD)**.
*   **Discount Coupons**: Apply shop-specific coupons during checkout for instant discounts.
*   **Real-time Seller Chat**: Direct messaging interface with sellers to clear product queries.
*   **Order Tracking**: Detailed order history, live status tracking, and refund request system.

### 🏪 2. For Sellers (Vendors)
*   **Dedicated Shop Portal**: Fast shop creation, customized shop branding, settings, and profile pages.
*   **Fulfillment Dashboard**: Overview of earnings (after platform commissions), sales metrics, and active orders.
*   **Inventory & Events Management**: Add/Delete products, manage stock levels, and launch time-limited discount promotional events.
*   **Coupon Generator**: Create product-specific or shop-wide discount coupon codes.
*   **Earnings Withdrawal**: Request money withdrawals directly from the admin with custom bank details.
*   **Real-time Inbox**: Direct instant messaging with active customers to boost sales.

### 👑 3. For Super Administrators
*   **Global Overview Dashboard**: Tracking total platform earnings, active sellers, users, and overall orders.
*   **Vendor Moderation**: Approve, manage, or delete seller shops and user accounts.
*   **Withdrawal Approvals**: Review and verify vendor withdrawal requests with automated notifications.
*   **Global Control**: Full moderation rights over active products, promotional events, and platform reviews.

---

## 🖥️ Modern Tech Stack

*   **Frontend**: React (v18), Redux Toolkit (State Management), Tailwind CSS (Styling), Material-UI (UI Components)
*   **Backend**: Node.js, Express.js, MongoDB (Mongoose ORM), JWT (Stateless Authentication)
*   **Real-time Services**: Socket.io (Instant Web-Socket Chat Connection)
*   **Mailer Service**: Nodemailer (App Password SMTP Integration)
*   **Media Handling**: Multer (Local disk storage configurations)

---

## 📂 Folder Structure

```text
NexCart/
├── frontend/        # React Client Application
├── backend/         # Express API Server & Configurations
└── socket/          # Socket.io Real-time Chat Server
```

---

## 💻 How to Run NexCart Locally

Follow these simple steps to run the complete platform on your local machine using **npm**:

### 🛠️ Step 1: Clone and Configure Environment Files

Create a `.env` file in **`backend/config/`** and fill in your credentials:

```env
PORT = 8000
DB_URL = "your_mongodb_connection_string"
JWT_SECRET_KEY = "your_jwt_secret_key"
JWT_EXPIRES = 7d
ACTIVATION_SECRET = "your_email_activation_key"

# Mail Configuration (SMTP)
SMPT_SERVICE = "gmail"
SMPT_HOST = "smtp.gmail.com"
SMPT_PORT = 465
SMPT_MAIL = "your_email@gmail.com"
SMPT_PASSWORD = "your_gmail_app_password"

# Payment Gateways (Optional)
STRIPE_API_KEY = "your_stripe_publishable_key"
STRIPE_SECRET_KEY = "your_stripe_secret_key"
```

---

### 🏃 Step 2: Running the Application Services

Open **3 separate terminals** (Command Prompts) and run the following commands:

#### **Terminal 1: Backend Server**
```bash
cd backend
npm install
npm run dev
```
*Your backend will start running on [http://localhost:8000](http://localhost:8000)*

#### **Terminal 2: Socket Server**
```bash
cd socket
npm install
npm start
```
*Your chat server will start running on port `4000`*

#### **Terminal 3: Frontend Client**
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```
*The frontend client will compile and automatically open [http://localhost:3000](http://localhost:3000) in your default web browser!*

---

## 🛡️ License

This project is licensed under the ISC License. Created and updated by **Praveen Dwivedi (NexCart)**. Feel free to customize and make it your own!
