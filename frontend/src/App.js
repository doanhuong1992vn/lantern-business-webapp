import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import componentQueries from 'react-component-queries';
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
import '~/styles/reduction.scss';

const App = ({ breakpoint }) => {
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
                                <AdminLayout breakpoint={breakpoint}><AboutUs/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout breakpoint={breakpoint}><Dashboard/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/categories" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout breakpoint={breakpoint}><Categories/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/products" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout breakpoint={breakpoint}><Products/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/admin/import-products" element={
                            <ProtectedRoute accessBy="authenticated">
                                <AdminLayout breakpoint={breakpoint}><ImportProduct/></AdminLayout>
                            </ProtectedRoute>
                        }></Route>
                    </Routes>
                </AuthContextProvider>
            </div>
        </Router>
    );
}

const query = ({ width }) => {
    if (width < 575) {
        return { breakpoint: 'xs' };
    }

    if (576 < width && width < 767) {
        return { breakpoint: 'sm' };
    }

    if (768 < width && width < 991) {
        return { breakpoint: 'md' };
    }

    if (992 < width && width < 1199) {
        return { breakpoint: 'lg' };
    }

    if (width > 1200) {
        return { breakpoint: 'xl' };
    }

    return { breakpoint: 'xs' };
};


export default componentQueries(query)(App);
