// Router.configure({
//   // the default layout
//   layoutTemplate: 'about'
// });

Router.route('/', function () {
  this.render('about');
});

Router.route('/school', function () {
  this.render('school');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/school', function () {
  this.render('school');
});

Router.route('/school', function () {
  this.render('school');
});
// Router.route('/register', function () {
//   this.render('register');
//   this.layout('logRegHeader');
// });

