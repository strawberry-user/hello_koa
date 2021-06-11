var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.render('hello.html',  {
        name: name,
        fruits: ['Apple', 'Pear', 'Banana'],
        count: 12000
    });
};

var fn_extend = async (ctx, next) => {
    ctx.render('extend.html',   {
        header: 'Hello',
        body: 'bla bla bla...'
    });
};


module.exports = {
    'GET /hello/:name': fn_hello,
    'GET /extend': fn_extend
};