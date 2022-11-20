const Music=require('../models/music');
const Merch=require('../models/merch');

const ITEMS_Per_Page=2;

exports.getMusic=((req,res,next)=>{
  const page=+req.query.page ||1;
  var totalItems;
  Music.count()
  .then((numProducts) => {
     totalItems = numProducts;
    return Music.findAll({
      offset: (page - 1) * ITEMS_Per_Page ,
      limit: ITEMS_Per_Page
    });
  })
  .then((result) => {
   res.json({
    data:result,
    currentPage: page,
    hasNextPage: totalItems > page * ITEMS_Per_Page,
    hasPreviousPage: page > 1,
    nextPage: +page + 1,
    previousPage: +page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_Per_Page)
   }) 
  }).catch((err) => {
    console.log(err)
  });
})
// exports.getMerch=((req,res,next)=>{
//   const page=+req.query.page ||1;
//   var totalItems;
//   Merch.count()
//   .then((numProducts) => {
//      totalItems = numProducts;
//     return Merch.findAll({
//       offset: (page - 1) * ITEMS_Per_Page ,
//       limit: ITEMS_Per_Page
//     });
//   })
//   .then((result) => {
//    res.json({
//     data:result,
//     currentPage: page,
//     hasNextPage: totalItems > page * ITEMS_Per_Page,
//     hasPreviousPage: page > 1,
//     nextPage: +page + 1,
//     previousPage: +page - 1,
//     lastPage: Math.ceil(totalItems / ITEMS_Per_Page)
//    }) 
//   }).catch((err) => {
//     console.log(err)
//   });
// })
