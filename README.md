# 💎 GoldJewel BillingDesk - Free Jewelry Billing Software

GoldJewel BillingDesk is a lightweight, efficient, and user-friendly jewelry billing solution designed especially for small and medium jewelry shops. Built using **Node.js**, **Express**, **EJS**, and **JSON**, it’s a **cost-effective alternative** to expensive billing software – created to solve a **real-world need quickly and affordably**.

## 🔧 Purpose

Most billing software available in the market is **expensive and complex**, making it difficult for local jewelers and small businesses to manage sales efficiently. This project was developed urgently as a **free solution** to meet that need – **a full-featured jewelry billing platform** that is easy to use, requires no database setup, and runs effortlessly on any system with Node.js installed.

---

## ✅ Features

### 🧾 Billing & Invoicing
- Generate detailed invoices with multiple items.
- Includes customer information, item-wise details, making charges, and GST breakdown.
- Auto-calculates subtotal, taxes (CGST & SGST), round-off, and grand total.
- Displays amount in words for legal/financial purposes.
- Invoice preview rendered immediately after submission.
- Printable and downloadable invoices.

### 💡 Smart Functionalities
- ✅ Automatic bill number management.
- ✅ Built-in GST calculation (1.5% CGST + 1.5% SGST).
- ✅ Round-off adjustment.
- ✅ Multiple item entry with varying purities, weights, and making charges.
- ✅ Number-to-words conversion for amount summary.
- ✅ Payment mode selection (Cash/Online).

### 📊 Sales History & Filtering
- View all past sales saved in a JSON file.
- Search and filter sales history by custom date ranges.
- Displays each invoice with customer name, date, bill number, and total.

### 💾 Local Data Persistence
- Sales are stored securely in a local JSON file (`sales.json`).
- Bill numbers tracked using `billNumber.json` – no need for a database.
- Fast and easy backups – just copy your `/data` folder!

---

## 🖥️ Tech Stack

| Technology   | Purpose                      |
|--------------|------------------------------|
| Node.js      | Server-side runtime          |
| Express.js   | Web framework                |
| EJS          | Template rendering engine    |
| JSON files   | Persistent data storage      |
| HTML/CSS     | Frontend and styling         |
| JavaScript   | Client-side interactivity    |
| Select2      | Enhanced dropdown UI         |

---

## 📂 Project Structure

GoldJewel-BillingDesk/
├── views/ # EJS Templates
│ ├── form.ejs # Invoice form
│ ├── invoice.ejs # Invoice preview
│ └── sales-history.ejs # Past sales page
├── public/ # Static assets (CSS, JS)
│ └── styles/
├── data/ # Sales data & bill numbers
│ ├── sales.json
│ └── billNumber.json
├── .env # Environment variables
├── app.js # Main server file
├── package.json
└── README.md


---

## 🚀 How to Run Locally

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/GoldJewel-BillingDesk.git
cd GoldJewel-BillingDesk
2. Install dependencies: npm install
3. Start the application: node app.js
4. Open in browser:
Go to http://localhost:3000
```
---

## 📃 License
This project is open-source and free to use. Attribution appreciated.

---

## 🙏 Special Note
This project was built under urgent real-life requirements to provide a free, working solution to jewelry store owners who couldn't afford commercial billing systems. It is simple, powerful, and practical – and helps real businesses stay efficient and compliant without extra cost.