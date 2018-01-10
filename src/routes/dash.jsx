import Dashboard from 'views/Dashboard/Dashboard.jsx';
import AddOrderPage from 'views/Orders/AddOrderPage.jsx';
import PendingOrdersPage from 'views/Orders/PendingOrdersPage.jsx';
import OrdersHistoryPage from 'views/Orders/OrdersHistoryPage.jsx';
import DeliveriesHistoryPage from 'views/Plans/DeliveriesHistoryPage.jsx';

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },

    { collapse: true, path: "/orders", name:"Orders", state:"openOrders", icon:"pe-7s-gift", views:[
        {path: "/add-order", name: "Add Order", mini: "AO", component: AddOrderPage},
        {path: "/pending-orders", name:"Pending Orders", mini: "PO", component: PendingOrdersPage},
        {path: "/orders-history", name:"Orders History", mini: "OH", component: OrdersHistoryPage}
    ]},

    { collapse: true, path: "/plans", name:"Plans", state:"openPlans", icon:"pe-7s-car", views:[
        {path: "/deliveries-history", name:"Deliveries History", mini: "DH", component: DeliveriesHistoryPage}
    ]},
     
    { redirect: true, path: "/", pathTo: "/pages/login-page", name: "Login" }
];
export default dashRoutes;
