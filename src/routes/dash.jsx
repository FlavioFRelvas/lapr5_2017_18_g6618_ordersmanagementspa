import Dashboard from 'views/Dashboard/Dashboard.jsx';
import PendingOrdersPage from 'views/Orders/PendingOrdersPage.jsx';
import OrdersHistoryPage from 'views/Orders/OrdersHistoryPage.jsx';
import DeliveryPlans from 'views/Plans/DeliveryPlans.jsx';

var dashRoutes = [
    
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },

    {
        collapse: true, path: "/orders", name: "Orders", state: "openOrders", icon: "pe-7s-gift", views: [
            //{path: "/add-order", name: "Add Order", mini: "AO", component: AddOrderPage},
            { path: "/pending-orders", name: "Pending Orders", mini: "PO", component: PendingOrdersPage },
            { path: "/orders-history", name: "Orders History", mini: "OH", component: OrdersHistoryPage }
        ]
    },

    {
        collapse: true, path: "/plans", name: "Plans", state: "openPlans", icon: "pe-7s-car", views: [
            { path: "/delivery-plans", name: "Delivery plans", mini: "DP", component: DeliveryPlans }
        ]
    },

    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
