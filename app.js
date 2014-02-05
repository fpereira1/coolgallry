$(function() {


require(['libs/text!header.html', 'libs/text!home.html', 'libs/text!footer.html'], function (headerTpl, homeTpl, footerTpl) {

	HeaderView = Backbone.View.extend({
		el: "#header",
		templateFileName: "header.html",
		template: headerTpl,

		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	FooterView = Backbone.View.extend({
		el: "#footer",
		template: footerTpl,
		render: function() {
			this.$el.html(_.template(this.template));
		}
	})
	HomeView = Backbone.View.extend({
		el: "#content",
		template: homeTpl,
		initialize: function() {

		},
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	var ApplicationRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"*actions": "home"
	},
	initialize: function() {
		this.headerView = new HeaderView();
		this.headerView.render();
		this.footerView = new FooterView();
		this.footerView.render();
		
		// a.on('fecth', function() { alert('fetch'); })
		a.fetch()
	},
	home: function() {
		this.homeView = new HomeView();
		this.homeView.render();

		// a.each(function(p) {$('body').append(p.image()); });
		// alert(a.toJSON());
		// this.PhotoView = new PhotoView;
		// this.PhotoView.render();
	}
});

app = new ApplicationRouter();
Backbone.history.start();


		
});



var Photo  = Backbone.Model.extend({
	defaults: {
		'base' : 'http://res.cloudinary.com/peartreeme/image/upload/',
		'filters' : 'w_240,h_200,c_crop,g_faces'
	},
	getImageURL: function() {
		return this.get('base') + this.get('filters') + '/' + this.get('file');
	},
	image: function() {
		var self = this;
		return $('<img />', {
			src: this.getImageURL(),
			href: '#myModal',
			'data-toggle': "modal",
			'data-img-url': this.getImageURL()
		}).click(function() {
			$('#myModal .modal-body').empty().append(this);
		});
	}
});

var Album  = Backbone.Collection.extend({
	'model': Photo,
	'url' : 'server/photos'
});

a = new Album;
a.on('sync', function() {
    $('#content').empty();
    a.each(function(p) {$('#content').append(p.image()); });
});

// Fetch the collection every 3s
setInterval(function() {
	a.reset(a.shuffle(), {silent:true});
	a.fetch();
}, 3000);


$('.carousel').carousel();


});