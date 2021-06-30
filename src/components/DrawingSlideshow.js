import Canvas from 'components/Canvas';
import React, { Component } from 'react';
import Slider from 'react-slick';

export default class SlickGoTo extends React.Component {
    state = {
        slideIndex: 0,
        updateCount: 0,
    };

    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: () =>
                this.setState((state) => ({
                    updateCount: state.updateCount + 1,
                })),
            beforeChange: (current, next) =>
                this.setState({ slideIndex: next }),
        };

        const loaded = () => {
            return (
                <div className="slider-container">
                    <div className="slider">
                        <link
                            rel="stylesheet"
                            type="text/css"
                            charSet="UTF-8"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                        />
                        <link
                            rel="stylesheet"
                            type="text/css"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                        />
                        <p>Commit #: {this.state.slideIndex + 1}</p>
                        <input
                            onChange={(e) =>
                                this.slider.slickGoTo(e.target.value)
                            }
                            value={this.state.slideIndex}
                            type="range"
                            min={0}
                            max={this.props.images.length - 1}
                        />
                        <Slider
                            ref={(slider) => (this.slider = slider)}
                            {...settings}
                            // style={{
                            //     width: `${this.props.width}px`,
                            //     height: `${this.props.height}px`,
                            // }}
                        >
                            {this.props.images.map((image, i) => (
                                <div key={image.id}>
                                    {/* <Canvas
                                        key={i}
                                        dataUrl={image.data_url}
                                        commitMessage={image.commit_message}
                                        commitAuthor={image.commit_author}
                                        height={this.props.height}
                                        width={this.props.width}
                                    ></Canvas> */}
                                    <img
                                        src={image.data_url}
                                        alt={image.id}
                                        style={{
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            // width: '96%',
                                        }}
                                    ></img>
                                    {/* <h6>
                                        Commit author: {image.commit_author}
                                    </h6>
                                    <h5>
                                        Commit message: {image.commit_message}
                                    </h5> */}
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            );
        };

        const loading = () => {
            return <div>loading images...</div>;
        };

        return this.props.id ? loaded() : loading();
    }
}
