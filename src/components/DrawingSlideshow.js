// import Canvas from 'components/Canvas';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { useEffect } from 'react';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';
// import Slider from 'react-slick';

// const SliderCard = styled.div`
//     /* display: flex; */
//     position: relative;
//     /* border: 1px solid magenta; */
//     min-height: 400px;
//     width: 100%;
//     text-align: center !important;
//     text-overflow: ellipsis !important;
//     overflow: visible !important;

//     img {
//         margin: auto;
//         padding-left: 10px;
//         padding-right: 10px;
//         max-height: 200px;
//         /* width: 25%; */
//         /* height: 60%; */
//     }

//     div.description {
//         position: absolute;
//         padding-top: 20px;
//         padding-left: 10px;
//         padding-right: 10px;
//         /* overflow: visible !important; */
//         /* bottom: 0; */
//         /* height: 100px; */
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         /* align-items: center; */
//     }
// `;

// const DrawingSlideshow = (props) => {
//     useEffect(() => {
//         document.title = `Canvas ${props.id}`;
//     }, []);
//     const loaded = () => {
//         const settings = {
//             dots: true,
//             infinite: false,
//             speed: 500,
//             slidesToShow: Math.min(4, props.images.length),
//             slidesToScroll: Math.min(4, props.images.length),
//             initialSlide: 0,
//             responsive: [
//                 {
//                     breakpoint: 1024,
//                     settings: {
//                         slidesToShow: Math.min(3, props.images.length),
//                         slidesToScroll: Math.min(3, props.images.length),
//                         infinite: true,
//                         dots: true,
//                     },
//                 },
//                 {
//                     breakpoint: 600,
//                     settings: {
//                         slidesToShow: Math.min(2, props.images.length),
//                         slidesToScroll: Math.min(2, props.images.length),
//                         initialSlide: Math.min(2, props.images.length),
//                     },
//                 },
//                 {
//                     breakpoint: 480,
//                     settings: {
//                         slidesToShow: Math.min(1, props.images.length),
//                         slidesToScroll: Math.min(1, props.images.length),
//                     },
//                 },
//             ],
//         };

//         return (
//             <div className="slider-container">
//                 <div className="slider">
//                     <link
//                         rel="stylesheet"
//                         type="text/css"
//                         charSet="UTF-8"
//                         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
//                     />
//                     <link
//                         rel="stylesheet"
//                         type="text/css"
//                         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
//                     />
//                     <Slider {...settings}>
//                         {props.images.map((image, i) => (
//                             <Canvas
//                                 key={i}
//                                 bytes={image.bytes}
//                                 height={props.height}
//                                 width={props.width}
//                             ></Canvas>
//                         ))}
//                     </Slider>
//                 </div>
//             </div>
//         );
//     };

//     const loading = () => {
//         return <div>loading images...</div>;
//     };

//     return props.id ? loaded() : loading();
// };

// export default DrawingSlideshow;

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
            dots: false,
            infinite: true,
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
                        <p>Commit #: {this.state.slideIndex + 1} </p>
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
                        >
                            {this.props.images.map((image, i) => (
                                <div>
                                    <Canvas
                                        key={i}
                                        bytes={image.bytes}
                                        height={this.props.height}
                                        width={this.props.width}
                                    ></Canvas>
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
