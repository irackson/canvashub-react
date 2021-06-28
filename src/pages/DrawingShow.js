import DrawingSlideshow from 'components/DrawingSlideshow';
import { fetchDrawingById } from 'utils/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DrawingShow = (props) => {
    const [showData, setShowData] = useState({ isLoaded: false });
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

    const loaded = () => {
        return (
            <div className="drawing-show">
                <div className="drawing-show__info-edit">
                    <h2>{showData.title}</h2>
                    <h3>By {showData.creator}</h3>
                    <h4>
                        <Link to={`/drawings/${props.match.params.id}/edit`}>
                            Edit (new commit)
                        </Link>
                    </h4>
                </div>
                {showData.images.length > 0 ? (
                    <DrawingSlideshow
                        className="slideshow"
                        images={showData.images}
                        height={showData.height}
                        width={showData.width}
                        id={props.match.params.id}
                    ></DrawingSlideshow>
                ) : (
                    <div>
                        <h5>create the first commit!</h5>
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
