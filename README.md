# FashionHub - Modern E-Commerce Frontend

![FashionHub Demo](./assets/image2.png)

A responsive and dynamic e-commerce frontend application built with vanilla HTML, CSS, and JavaScript, featuring a full user authentication flow powered by Firebase. Browse products, manage your shopping cart, and enjoy a seamless checkout experience.

**Live Demo:** [https://sudo-brinthan.github.io/ecommerce-frontend/](https://sudo-brinthan.github.io/ecommerce-frontend/)

---

## ✨ Key Features

- **User Authentication:** Secure user signup and login functionality using Firebase Authentication (Email/Password).
- **Dynamic Product Loading:** Products are fetched asynchronously from the [Fake Store API](https://fakestoreapi.com/) and displayed in a clean, modern grid.
- **Shopping Cart:** Fully functional cart that allows users to add, remove, and update item quantities. Cart data persists using `localStorage`.
- **Responsive Design:** A mobile-first design that ensures a seamless experience on all devices, from desktops to smartphones.
- **Interactive UI:** Features like a hamburger menu for mobile navigation, image zoom modals, and on-screen form validation.
- **Static Pages:** Includes beautifully designed "About Us" and "Contact Us" pages.
- **Performance Optimized:** Implements modern web performance techniques like deferred script loading and minified CSS for faster load times.

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Authentication:** Firebase Authentication
- **API:** [Fake Store API](https://fakestoreapi.com/) for product data
- **Deployment:** GitHub Pages

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a web browser and a code editor (like VS Code).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/sudo-brinthan/ecommerce-frontend.git](https://github.com/sudo-brinthan/ecommerce-frontend.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd ecommerce-frontend
    ```
3.  **Set up your own Firebase project:**
    - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    - Register a new web app and enable **Email/Password Authentication**.
    - Copy your Firebase configuration keys.
4.  **Add your Firebase configuration:**
    - In the `scripts` folder, create a file named `firebase-config.js`.
    - Paste your configuration keys into the file, like so:
      ```javascript
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        // ...and so on
      };
      
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();
      ```
5.  **Open `index.html` in your browser:**
    - You can use a live server extension in your code editor for the best experience, or simply open the file directly.

---

## 📂 File Structure

Here is the basic structure of the project:


ecommerce-frontend/
├── assets/
│   └── (images, logos, etc.)
├── scripts/
│   ├── app.js         # Main application logic, product fetching
│   ├── auth.js        # Handles Firebase login/signup
│   ├── cart.js        # Shopping cart functionality
│   ├── checkout.js    # Checkout page logic
│   └── firebase-config.js # Firebase project keys
├── styles/
│   ├── main.css       # Main stylesheet
│   └── auth.css       # Styles for login/signup pages
├── about.html
├── cart.html
├── checkout.html
├── contact.html
├── index.html
├── login.html
├── product.html
├── signup.html
└── README.md


---

## 👤 Author

**Brinthan**

- GitHub: [@sudo-brinthan](https://github.com/sudo-brinthan)
- Project Link: [https://github.com/sudo-brinthan/ecommerce-frontend](https://github.com/sudo-brinthan/ecommerce-frontend)

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
