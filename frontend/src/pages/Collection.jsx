import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relavent");

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    const applyFilter = (productsToFilter) => {
        let filtered = productsToFilter;

        if (showSearch && search) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            filtered = filtered.filter((item) =>
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            filtered = filtered.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }

        return filtered;
    };

    const sortProduct = (productsToSort) => {
        let sortedProducts = productsToSort.slice();

        switch (sortType) {
            case "low-high":
                return sortedProducts.sort((a, b) => a.price - b.price);
            case "high-low":
                return sortedProducts.sort((a, b) => b.price - a.price);
            default:
                return sortedProducts;
        }
    };

    const applyFilterAndSort = () => {
        let filteredProducts = applyFilter(products);
        let sortedProducts = sortProduct(filteredProducts);
        setFilterProducts(sortedProducts);
    };

    useEffect(() => {
        applyFilterAndSort();
    }, [category, subCategory, sortType, search, showSearch, products]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* FIlter Options */}
            <div className="min-w-60">
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2">
                    FILTERS
                    <img
                        src={assets.dropdown_icon}
                        alt=""
                        className={`h-3 sm:hidden transition-all duration-300 ${
                            showFilter ? "rotate-90" : ""
                        }`}
                    />
                </p>

                {/* Categories Filters */}
                <div
                    className={`border border-g300 pl-5 py-3 mt-6 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                value={"Men"}
                                onChange={toggleCategory}
                                className="w-3 accent-primary hover:scale-110 transition-all"
                            />{" "}
                            Men
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                value={"Women"}
                                onChange={toggleCategory}
                                className="w-3 accent-primary hover:scale-110 transition-all"
                            />{" "}
                            Women
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                value={"Kids"}
                                onChange={toggleCategory}
                                className="w-3 accent-primary hover:scale-110 transition-all"
                            />{" "}
                            Kids
                        </p>
                    </div>
                </div>

                {/* SubCategories Filers */}
                <div
                    className={`border border-g300 pl-5 py-3 my-5 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                value={"Topwear"}
                                onChange={toggleSubCategory}
                                className="w-3 accent-primary hover:scale-110 transition-all"
                            />{" "}
                            Topwear
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                value={"Bottomwear"}
                                onChange={toggleSubCategory}
                                className="w-3 accent-primary hover:scale-110 transition-all"
                            />{" "}
                            Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                value={"Winterwear"}
                                onChange={toggleSubCategory}
                                className="w-3 accent-primary hover:scale-110 transition-all"
                            />{" "}
                            Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* Product Sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="border-2 border-gray-300 text-sm px-2">
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((product, index) => (
                        <ProductItem
                            key={index}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Collection;
