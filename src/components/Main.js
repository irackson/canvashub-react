import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import StoreProvider from 'components/providers/StoreProvider';
import DrawingIndex from 'pages/DrawingIndex';
import DrawingCreate from 'pages/DrawingCreate';
import DrawingShow from 'pages/DrawingShow';
import DrawingEdit from 'pages/DrawingEdit';
import Home from 'pages/Home';
import { fetchDrawingsIndex } from 'utils/api';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export default function Main(props) {
    const [indexData, setIndexData] = useState({ isLoaded: false });
    const getIndexData = async () => {
        setIndexData({ ...(await fetchDrawingsIndex()), isLoaded: true });
    };

    useEffect(() => {
        getIndexData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StoreProvider>
            <Header />
            <main>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} />}
                    ></Route>
                    <Route
                        path="/drawings"
                        exact
                        render={(props) => (
                            <DrawingIndex
                                {...props}
                                isLoaded={indexData.isLoaded}
                                allDrawings={indexData.all_drawings}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/drawings/create"
                        render={(props) => <DrawingCreate {...props} />}
                    ></Route>
                    <Route
                        path="/drawings/:id"
                        render={(props) => <DrawingShow {...props} />}
                    ></Route>
                    <Route
                        path="/drawings/:id/edit"
                        exact
                        render={(props) => <DrawingEdit {...props} />}
                    ></Route>

                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </main>
            <Footer />
        </StoreProvider>
    );
}
