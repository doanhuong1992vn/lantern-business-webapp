import AboutUs from '~/pages/admin-pages/AboutUs';
import AdminLogin from '~/pages/admin-pages/AdminLogin';
import Dashboard from '~/pages/admin-pages/Dashboard';
import Categories from '~/pages/admin-pages/Categories';
import Products from '~/pages/admin-pages/products/Products';
import ImportProduct from '~/pages/admin-pages/products/ImportProduct';
import Home from "~/pages/customer-pages/Home";

const publicRoutes = [

]

const privateRoutes = [
    { path: '/', component: Home, layout: null},
    { path: '/login', component: AdminLogin, layout: null},
    { path: '/admin/about-us', component: AboutUs},
    { path: '/admin/dashboard', component: Dashboard},
    { path: '/admin/categories', component: Categories},
    { path: '/admin/products', component: Products},
    { path: '/admin/import-products', component: ImportProduct},

]

export { publicRoutes, privateRoutes }