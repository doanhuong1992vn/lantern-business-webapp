import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes } from '~/routes';
import { AdminLayout } from '~/layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : AdminLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
