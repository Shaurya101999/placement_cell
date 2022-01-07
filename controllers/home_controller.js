module.exports.home = function(req, res ){
    console.log(req.cookies);
    res.render('home' ,{
        title: 'Home'
    });

}