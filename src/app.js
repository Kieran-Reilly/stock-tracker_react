import { useState } from "react";

/**
 * Filterable Product Table component
 * Responsible for managing the state of the filterText and inStockOnly.
 * Creates the SearchBar and ProductTable components, handing the relevant props and state management functions across.
 * 
 * @param {JSON} stock - JSON structure representing the list of stock items 
 * @returns {JSX Elements} The Search Bar and Product Table components are created and returned
 */
function FilterableProductTable({stock}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div className="filterable-product-table">
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} setFilterText={setFilterText} setInStockOnly={setInStockOnly}/>
            <ProductTable stock={stock} filterText={filterText} inStockOnly={inStockOnly}/>
        </div>
    );
}

/**
 * Search Bar Component
 * Responsible for updating the states of the filterText and the inStockOnly.
 * Creates the search-input search box for filtering on category and item names, and the in-stock check-box for toggling in-stock items.
 * 
 * @param {String} filterText - The filter text input value from the search-input
 * @param {Boolean} inStockOnly - The boolean value of the in-stock check-box
 * @param {function} setFilterText - Hook to set the filterText state when the search-input updates
 * @param {function} setInStockOnly - Hook to set the inStockOnly state when the in-stock check-box updates
 * @returns {JSX Elements} returns the search-input for filter and the in-stock check-box for toggling in-stock items
 */
function SearchBar({filterText, inStockOnly, setFilterText, setInStockOnly}) {
    function onFilterTextChange(event) {
        setFilterText(event.target.value);
    }

    function onCheckBoxChange(event) {
        setInStockOnly(event.target.checked)
    }

    return (
        <form className="search-bar">
            <input className="search-input" type="search" placeholder="Search..." value={filterText} onChange={onFilterTextChange} />
            <label>
                <input className="check-box" type="checkbox" checked={inStockOnly} onChange={onCheckBoxChange}/>
                Only show products in stock
            </label>
        </form>
    );
}

/**
 * Product Table Component
 * Responsible for transforming the data so that it is categorised.
 * Builds up the productCategoryRows and productRows based on the filtered text supplied.
 * 
 * @param {JSON} stock - JSON structure representing the list of stock items 
 * @param {String} filterText - The text value of the search-input to filter on categories and item names
 * @param {Boolean} inStockOnly - The in-stock check-box value
 * @returns {JSX Elements} productCategoryRows and productRows elements based on the filtered text supplied
 */
function ProductTable({stock, filterText, inStockOnly}) {
    //transform data so that it is categorised
    const categories = {};
    const categoryKeys = [];
    for (const item of stock) {
        if (categories[item.category] == null) {
            categories[item.category] = [];
            categoryKeys.push(item.category);
        }

        categories[item.category].push(item);
    }

    //run through the stock and build up the productCategoryRows based off filterText if supplied
    let productCategoryRows = [];
    for (const category of categoryKeys) {
        let productRows = [];
        for (const item of categories[category]) {
            //checking if filter text is supplied, and if the item name or category is equal to the filter
            if (filterText !== '' && (item.name.toLowerCase() !== filterText.toLowerCase() && category.toLowerCase() !== filterText.toLowerCase())) continue;

            productRows.push(
                <ProductRow key={item.name} product={item} inStockOnly={inStockOnly} />
            );
        }

        if (productRows.length > 0) {
            productCategoryRows.push(
                <div key={category}>
                    <ProductCategoryRow key={category} productCategory={category} />
                    {productRows}
                </div>
            )
        }
    }

    return (
        <>
            <div className="product-table-header">
                <h3>Name</h3>
                <h3>Price</h3>
            </div>
            {productCategoryRows}
        </>
    );
}

/**
 * Product Category Row
 * Responsible for creating a header with the product category provided.
 * 
 * @param {String} productCategory - the stock item category
 * @returns {JSX Elements} h4 with the product category provided
 */
function ProductCategoryRow({productCategory}) {
    return (
        <h4>{productCategory}</h4>
    );
}

/**
 * Product Row Component
 * Responsible for creating a product row detailing a stock items, name and price, 
 * as well as highlighting an item if it is out of stock.
 * 
 * @param {Object} product - an object containing properties about a stock item
 * @param {Boolean} inStockOnly - the in-stock check-box value indicating whether an item should be highlighted as out of stock 
 * @returns {JSX Elements} returns a product row containing name and price spans, and highlighting the name of out of stock items.
 */
function ProductRow({product, inStockOnly}) {
    if (product.stocked !== true) {
        if (inStockOnly === true) return;

        return (
            <div className="product-row">
                <span className="not-stocked">{product.name}</span>
                <span>{product.price}</span>
            </div>
        )
    }

    return (
        <div className="product-row">
            <span>{product.name}</span>
            <span>{product.price}</span>
        </div>
    )
}

const data = [
    { "category": "Fruits", "price": "$1", "stocked": true, "name": "Apple" },
    { "category": "Fruits", "price": "$1", "stocked": true, "name": "Dragonfruit" },
    { "category": "Fruits", "price": "$2", "stocked": false, "name": "Passionfruit" },
    { "category": "Vegetables", "price": "$2", "stocked": true, "name": "Spinach" },
    { "category": "Vegetables", "price": "$4", "stocked": false, "name": "Pumpkin" },
    { "category": "Vegetables", "price": "$1", "stocked": true, "name": "Peas" }
];


export default function app() {
    return (
        <FilterableProductTable stock={data}/>
    )
}