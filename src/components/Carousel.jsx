import React, { useState } from 'react'

export default function Carousel({ Search, setSearch }) {

    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://media.istockphoto.com/id/476391316/photo/4th-of-july-picnic.jpg?s=612x612&w=0&k=20&c=CNvWB8j2Kn8okKwyxWv-mzKd-GqnHKXxZGw244_2iz0=" className="d-block w-100" alt="..." style={
                            { filter: "brightness(30%)" }
                        } />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/955998652/photo/homemade-chickpea-hummus-bowl-with-pita-chips-and-paprika.jpg?s=612x612&w=0&k=20&c=H3m78rhd7113mc06CqBKLH4PVn7e8AUmTes2yCQEzlY=" className="d-block w-100" alt="..." style={
                            { filter: "brightness(30%)" }
                        } />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/888366454/photo/chicken-wrap.jpg?s=612x612&w=0&k=20&c=smy2oTsWnDDDEaS_Rkn6Jj-7KXll4FlO_aYR9BoKcu0=" className="d-block w-100" alt="..." style={
                            { filter: "brightness(30%)" }
                        } />
                    </div>
                    <div className="carousel-caption d-none d-md-block" style={
                        { zIndex: "10" }
                    }>
                        <div className="d-flex " role="search">
                            <input id="food-searcher" className="form-control me-2 bg-dark text-white opacity-50 " type="search" placeholder="Search" aria-label="Search" value={Search} onChange={
                                (e) => {
                                    setSearch(e.target.value)
                                }
                            } />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

    )
}
