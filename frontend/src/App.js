import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AdminLayout} from '~/layouts';
import Home from "~/pages/customer-pages/Home";
import AdminLogin from "~/pages/admin-pages/AdminLogin";
import AboutUs from "~/pages/admin-pages/AboutUs";
import Dashboard from "~/pages/admin-pages/Dashboard";
import Categories from "~/pages/admin-pages/Categories";
import Products from "~/pages/admin-pages/products/Products";
import ImportProduct from "~/pages/admin-pages/products/ImportProduct";
import {AuthContextProvider} from "~/security/AuthContext";
import ProtectedRoute from "~/security/ProtectedRoute";
import Error403 from "~/pages/error-pages/Error403";

function App() {
    return (
        <Router>
            <div className="App">
                <AuthContextProvider>
                    <Routes>
                        {/*{privateRoutes.map((route, index) => {*/}
                        {/*    const Layout = route.layout === null ? Fragment : AdminLayout;*/}
                        {/*    const Page = route.component;*/}
                        {/*    return (*/}
                        {/*        <Route*/}
                        {/*            key={index}*/}
                        {/*            path={route.path}*/}
                        {/*            element={*/}
                        {/*                <Layout>*/}
                        {/*                    <Page />*/}
                        {/*                </Layout>*/}
                        {/*            }*/}
                        {/*        />*/}
                        {/*    );*/}
                        {/*})}*/}
                        <Route path="/error-403" element={<Error403/>}></Route>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/login" element={
                            <ProtectedRoute accessBy="non-authenticated">
                                <AdminLogin/>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout><AboutUs/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout><Dashboard/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/categories" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout><Categories/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/products" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout><Products/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/import-products" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout><ImportProduct/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                    </Routes>
                </AuthContextProvider>
            </div>
        </Router>
    );
}

export default App;
