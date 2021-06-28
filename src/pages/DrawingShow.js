import DrawingSlideshow from 'components/DrawingSlideshow';
import { fetchDrawingById } from 'utils/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DrawingShow = (props) => {
    const [showData, setShowData] = useState({ isLoaded: false });
    const [removable, setRemovable] = useState(true);
    const getShowData = async () => {
        setShowData({
            ...(await fetchDrawingById(props.match.params.id)),
            isLoaded: true,
        });
    };

    useEffect(() => {
        getShowData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const processDelete = async (event) => {
        event.preventDefault();
        const status = await props.deleteRepo(showData.id);
        if (status !== 409) {
            setRemovable(true);
            props.history.push('/drawings');
        } else {
            setRemovable(false);
        }
    };

    const loaded = () => {
        return (
            <div className="drawing-show">
                {showData.images.length > 0 ? (
                    <>
                        <div className="drawing-show__info-edit">
                            <h2>{showData.title}</h2>
                            <h3>By {showData.creator}</h3>
                            <h4>
                                <Link
                                    to={`/drawings/${props.match.params.id}/edit`}
                                >
                                    Edit (new commit)
                                </Link>
                            </h4>
                            <h6>
                                <button
                                    disabled={!removable}
                                    onClick={(event) => {
                                        processDelete(event);
                                    }}
                                >
                                    or delete repository
                                </button>
                            </h6>
                            {!removable ? (
                                <em>
                                    repos older than 5000s cannot be deleted{' '}
                                </em>
                            ) : null}
                        </div>
                        <DrawingSlideshow
                            className="slideshow"
                            images={showData.images}
                            height={showData.height}
                            width={showData.width}
                            id={props.match.params.id}
                        ></DrawingSlideshow>
                    </>
                ) : (
                    <div className="drawing-show__info-edit">
                        <h2>{showData.title}</h2>
                        <h3>By {showData.creator}</h3>
                        <h4>
                            <Link
                                to={`/drawings/${props.match.params.id}/edit`}
                            >
                                Create First Commit
                            </Link>
                        </h4>
                        <h6>
                            <button
                                disabled={!removable}
                                onClick={(event) => {
                                    processDelete(event);
                                }}
                            >
                                or delete repository
                            </button>
                        </h6>
                        {!removable ? (
                            <em>repos older than 5000s cannot be deleted </em>
                        ) : null}
                        <h6>
                            width: {showData.width}px, height: {showData.height}
                            px
                        </h6>
                    </div>
                )}
            </div>
        );
    };

    const loading = () => {
        return (
            <div>
                loading repository of drawing with{' '}
                <em>id = {props.match.params.id}</em>...
            </div>
        );
    };

    return showData.isLoaded ? loaded() : loading();
};

export default DrawingShow;
