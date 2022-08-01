

exports.Product = {
    category: (parent, args, {db}) => {

       const productCategoryId = parent.categoryId;
       return db.categories.find((category => category.id === productCategoryId));
    },
    reviews: (parent, args, {db}) => {
        const productCategoryId = parent.id;
        return db.reviews.filter((review) => review.productId === productCategoryId);
    }
}