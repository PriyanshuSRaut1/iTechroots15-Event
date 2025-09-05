# iTechroots 15 – Event Website  

This repository contains the complete source code for **iTechroots 15**, including both the **public event website** and the **admin dashboard**.  

---

## 📌 Projects in This Repo  

### 1️⃣ iTechroots Main Website  
The official public-facing site for **iTechroots 15**.  

**✨ Features**  
- 🎉 Event overview & highlights  
- 📅 Schedule & sessions  
- 👨‍💻 Team members (core, heads, members)  
- 📸 Gallery section  
- ❤️ Like system (Firebase integration)  
- 📩 Contact form (Firebase Realtime Database)  
- 🎨 Dark-themed, responsive UI with animations  

**🛠 Tech Stack**  
- React + Vite  
- Tailwind CSS  
- Framer Motion  
- Firebase  

---

### 2️⃣ Admin Dashboard  
A secure dashboard for event organizers to manage content.  

**✨ Features**  
- 🔐 Admin login/signup (one-time login)  
- 📊 Dashboard with analytics  
- 📅 Manage events & schedules  
- 👥 Manage team members  
- 🖼️ Upload & manage gallery images  
- 📩 View contact form submissions  
- 🏢 Manage sponsors  

**🛠 Tech Stack**  
- React  
- Tailwind CSS  
- Firebase  (for authentication & database)  

---
## 📂 Project Structure  
```bash
iTechroots15-Event/
│── admin/        # Admin dashboard code  
│   ├── src/  
│   ├── package.json  
│── itechroots-main/        # Public event website code  
│   ├── src/  
│   ├── package.json  
│── README.md               # Documentation
```
## Clone Repository
```bash
git clone https://github.com/PriyanshuSRaut1/iTechroots15-Event.git
cd iTechroots15-Event
```

## Run iTechroots Main Website
```bash
cd itechroots-main
npm install
```
## 👉 Important: Before running, create a file at itechroots-main/src/firebase.js (see Firebase Setup)
```bash
npm run dev
```
## Run Admin Dashboard
```bash
cd admin
npm install

```

## 👉 Important: Before running, create a file at admin/src/firebase.js (see Firebase Setup)
```bash
npm run dev
```
