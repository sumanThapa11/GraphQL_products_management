const logger = require('../services/loggerservice');


exports.Query = {

    hello: (parent, args, context) => {
        logger.info("Hello is queried");
        return "asvairav@as.net";
    },
    products: (parent, {filter}, {db}) => {
        let filteredProducts = db.products;

        if (filter){
            const {onSale, avgRating} = filter;
            if (filter.onSale === true){
                filteredProducts = filteredProducts.filter((product) => {
                    return product.onSale; 
                });
            }

            if([1,2,3,4,5].includes(avgRating)){
                filteredProducts = filteredProducts.filter ((product) => {
                    let sumRating = 0;
                    let numberOfReviews = 0;
                    db.reviews.forEach((review) => {
                        if (review.productId === product.id){
                            sumRating += review.rating;
                            numberOfReviews++;
                        }
                    });
                    const avgProductRating = sumRating / numberOfReviews;
                    return avgProductRating >= avgRating;          
                })
            }
        }
        return filteredProducts;
    },
    product: (parent,args,{db}) => {
       const productId = args.id;

       const product = db.products.find(product => product.id === productId);

       return product;
    },
    categories: (parent, args, {db}) => {
        return db.categories;  
    },
    category: (parent, args, {db}) => {
        const { id } = args;

        const category = db.categories.find(category => category.id === id);

        return category;
    },
}
