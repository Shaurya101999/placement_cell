module.exports.home = function(req, res ){
    // console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/user/user-home');
    }
    return res.render('home' ,{
        title: 'Home'
    });

}