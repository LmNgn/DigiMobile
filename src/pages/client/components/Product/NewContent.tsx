import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import newImage1 from "../../../../assets/image4.png";
import newImage2 from "../../../../assets/image5.png";
import { Container, Button } from "react-bootstrap";

const NewContent = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const newContent = [
        { id: "1", name: "iPhone 1", price: "$999", image: newImage1 },
        { id: "2", name: "iPhone 2", price: "$999", image: newImage2 },
        { id: "3", name: "iPhone 3", price: "$999", image: newImage1 },
        { id: "4", name: "iPhone 4", price: "$999", image: newImage2 },
        { id: "5", name: "iPhone 5", price: "$999", image: newImage1 },
        { id: "6", name: "iPhone 6", price: "$999", image: newImage2 },
    ];

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        }
    };

    const handleScroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
        }

        window.addEventListener("resize", updateScrollButtons);

        return () => {
            if (container) container.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, []);

    return (
        <section className="py-5 bg-light">
            <Container>
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Sản phẩm mới</h2>
                    <p className="text-secondary">Nhiều dung lượng lưu trữ hơn bao giờ hết</p>
                </div>

                <div className="position-relative">
                    {/* Nút điều hướng trái */}
                    {canScrollLeft && (
                        <Button
                            onClick={() => handleScroll("left")}
                            className="position-absolute start-0 top-50 translate-middle-y bg-white shadow-sm border z-2"
                        >
                            <FiChevronLeft className="fs-3 text-dark" />
                        </Button>
                    )}

                    {/* Nút điều hướng phải */}
                    {canScrollRight && (
                        <Button
                            onClick={() => handleScroll("right")}
                            className="position-absolute end-0 top-50 translate-middle-y bg-white shadow-sm border z-2"
                        >
                            <FiChevronRight className="fs-3 text-dark" />
                        </Button>
                    )}

                    {/* Danh sách sản phẩm */}
                    <div
                        ref={scrollRef}
                        className="d-flex overflow-auto scroll-hide px-2"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {newContent.map((product) => (
                            <div key={product.id} className="flex-shrink-0 mx-2" style={{ width: "280px" }}>
                                <div className="position-relative rounded overflow-hidden shadow-sm bg-white">
                                    <img
                                        src={product.image}
                                        className="w-100 object-cover"
                                        style={{ height: "380px", objectFit: "cover" }}
                                        alt={product.name}
                                    />
                                    <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-3">
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="text-white text-decoration-none"
                                        >
                                            <h5 className="mb-1">{product.name}</h5>
                                            <p className="m-0">{product.price}</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default NewContent;
