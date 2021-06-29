import DrawingSlideshow from 'components/DrawingSlideshow';
import { fetchDrawingById } from 'utils/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const MIN_TIME = process.env.REACT_APP_DELETE_MIN_TIME * 60 * 1000;
const MIN_NUM = process.env.REACT_APP_DELETE_MIN_NUM;

const DrawingShow = (props) => {
    const [showData, setShowData] = useState({ isLoaded: false });
    const [removable, setRemovable] = useState(null);
    const getShowData = async () => {
        const drawing = await fetchDrawingById(props.match.params.id);
        await getRemovableStatus(drawing);
        setShowData({
            ...drawing,
            isLoaded: true,
        });
    };

    const getRemovableStatus = async (drawing) => {
        if (
            drawing.images.length <= parseInt(MIN_NUM) ||
            (drawing.images.length > parseInt(MIN_NUM) &&
                new Date() - new Date(drawing.updated_at) >= parseInt(MIN_TIME))
        ) {
            setRemovable(true);
        } else {
            setRemovable(false);
        }
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
                            {/* TODO: refactor (not dry) */}
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
                                <h6>
                                    <em>
                                        repos with more than than {MIN_NUM}{' '}
                                        commits, or those with more than{' '}
                                        {MIN_NUM} that have been updated within
                                        the last{' '}
                                        {Math.floor(MIN_TIME / 60 / 1000)}{' '}
                                        minutes cannot be deleted
                                    </em>
                                </h6>
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
                        {/* TODO: refactor (not dry) */}
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
                            <h6>
                                <em>
                                    repos with more than than {MIN_NUM} commits,
                                    or those with more than {MIN_NUM} that have
                                    been updated within the last{' '}
                                    {Math.floor(MIN_TIME / 60 / 1000)} minutes
                                    cannot be deleted
                                </em>
                            </h6>
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
