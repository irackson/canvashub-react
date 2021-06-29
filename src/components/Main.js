import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import StoreProvider from 'components/providers/StoreProvider';
import DrawingIndex from 'pages/DrawingIndex';
import DrawingCreate from 'pages/DrawingCreate';
import DrawingShow from 'pages/DrawingShow';
import DrawingEdit from 'pages/DrawingEdit';
import Home from 'pages/Home';
import {
    fetchDrawingsIndex,
    fetchDrawingDelete,
    fetchDrawingCreate,
} from 'utils/api';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export default function Main(props) {
    const [indexData, setIndexData] = useState({ isLoaded: false });
    const getIndexData = async () => {
        setIndexData({ ...(await fetchDrawingsIndex()), isLoaded: true });
    };

    const deleteRepo = async (id) => {
        const status = await fetchDrawingDelete(id);
        if (status !== 409) {
            getIndexData();
        }
        return new Promise(function (myResolve) {
            myResolve(status);
        });
    };

    const createRepo = async (newRepo) => {
        const formattedNewRepo = { ...newRepo };
        if (formattedNewRepo.creator === '') {
            formattedNewRepo.creator = 'anon';
        }
        formattedNewRepo.height = parseInt(formattedNewRepo.height);
        formattedNewRepo.width = parseInt(formattedNewRepo.width);
        const response = await fetchDrawingCreate(formattedNewRepo);
        if (response.status !== 422) {
            getIndexData();
        }
        return new Promise(function (myResolve) {
            myResolve(response);
        });
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
                        render={(rp) => <Home {...rp} />}
                    ></Route>
                    <Route
                        path="/drawings"
                        exact
                        render={(rp) => (
                            <DrawingIndex
                                {...rp}
                                isLoaded={indexData.isLoaded}
                                allDrawings={indexData.all_drawings}
                                latestVersions={indexData.latest_versions}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/drawings/create"
                        render={(rp) => (
                            <DrawingCreate {...rp} createRepo={createRepo} />
                        )}
                    ></Route>
                    <Route
                        path="/drawings/:id/edit"
                        exact
                        render={(rp) => <DrawingEdit {...rp} />}
                    ></Route>
                    <Route
                        path="/drawings/:id"
                        render={(rp) => (
                            <DrawingShow {...rp} deleteRepo={deleteRepo} />
                        )}
                    ></Route>

                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </main>
            <Footer />
        </StoreProvider>
    );
}
