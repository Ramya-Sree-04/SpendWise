# 💰 SpendWise — Personal Finance Dashboard

SpendWise is a modern **personal finance tracking dashboard** that helps users monitor income, expenses, and financial trends through interactive visualizations and analytics.

Built using **React** and **Recharts**, the application provides clear insights into spending habits with a clean dark-themed interface.

---

## 🚀 Overview

SpendWise allows users to:

- Track income and expenses
- Analyze financial patterns
- View spending analytics
- Monitor savings performance
- Manage transactions efficiently

The project focuses on **data visualization**, **user experience**, and **financial awareness**.

---

## ✨ Features

### 📊 Dashboard (Overview)
- Net balance summary
- Total income & expenses
- Transaction count
- Cashflow visualization
- Top spending categories
- Recent activity tracking

### 💳 Transactions Management
- View all transactions
- Search by title, merchant, or tag
- Filter by category and flow type
- Sort by date or amount
- Export transactions as CSV

### 📈 Analytics
- Monthly grouped bar charts
- Cashflow trend analysis
- Spending by category
- Category-wise financial breakdown

### 🧠 Insights
- Savings rate calculation
- Top expense category detection
- Month-on-month spending comparison
- Subscription tracking
- Monthly surplus/deficit summary

### 👥 Role-Based Access
- **Viewer**
  - Read-only access
  - Filtering & exporting allowed
- **Admin**
  - Add transactions
  - Edit entries
  - Delete entries

(Role switching is frontend-based and instant.)

---

## 🛠️ Tech Stack

- **Frontend:** React 18
- **State Management:** React Context API
- **Charts & Visualization:** Recharts
- **Icons:** Lucide React
- **Styling:** CSS (Custom Properties / Dark Theme)
- **Data Storage:** LocalStorage (browser persistence)

---

## 📂 Project Structure
src/
│
├── components/ # UI components
│ ├── Sidebar
│ ├── Topbar
│ ├── StatCards
│ ├── Charts
│ ├── TxCard
│ └── EntryModal
│
├── pages/ # Application pages
│ ├── Overview
│ ├── Transactions
│ ├── Analytics
│ └── Insights
│
├── context/ # Global state management
│ └── AppContext.jsx
│
├── data/ # Mock data & categories
│ └── mockData.js
│
├── utils/ # Helper functions
│ └── utils.js
│
└── App.jsx

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/spendwise.git
2️⃣ Navigate to Project Folder
cd spendwise
3️⃣ Install Dependencies
npm install
4️⃣ Run the Application
npm start