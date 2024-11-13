function FilterableProductTable({stock}) {
    return (
        <div className="filterable-product-table">
            <SearchBar />
            <ProductTable stock={stock}/>
        </div>
    );
}

function SearchBar() {
    return (
        <form className="search-bar">
            <input className="search-input" type="search" placeholder="Search..."/>
            <label>
                <input className="check-box" type="checkbox" />
                Only show products in stock
            </label>
        </form>
    );
}

function ProductTable({stock}) {
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

    //run through the stock and build up the productCategoryRows
    let productCategoryRows = [];
    for (const category of categoryKeys) {
        let productRows = [];
        for (const item of categories[category]) {
            productRows.push(
                <ProductRow key={item.name} product={item} />
            );
        }

        productCategoryRows.push(
            <div key={category}>
                <ProductCategoryRow key={category} productCategory={category} />
                {productRows}
            </div>
        )
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

function ProductCategoryRow({productCategory}) {
    return (
        <h4>{productCategory}</h4>
    );
}

function ProductRow({product}) {
    //product.stocked
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