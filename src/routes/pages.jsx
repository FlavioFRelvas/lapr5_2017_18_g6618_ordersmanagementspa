import LoginPage from 'views/Pages/LoginPage.jsx';
import RegisterPage from 'views/Pages/RegisterPage.jsx';
import LockScreenPage from 'views/Pages/LockScreenPage.jsx';
import AddOrderPage from 'views/Orders/AddOrderPage.jsx';

var pagesRoutes = [
    { path: "/pages/login-page", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/pages/register-page", name: "Register", mini: "RP", component: RegisterPage },
    { path: "/pages/lock-screen-page", name: "Lock Screen Page", mini: "LSP", component: LockScreenPage },
    { path: "/orders/add-order", name: "Add Order", mini:"AO", component: AddOrderPage}
];

export default pagesRoutes;
