// create a song model
var Song = Backbone.Model.extend();

// create a songs collection
var Songs = Backbone.Collection.extend({
	model: Song
});

// create a song view
// get the title from 'model' argument. put it in an 'li'
var SongView = Backbone.View.extend({
	tagName: 'li',
	render: function() {
		// add the title to the html of this '$el'
		this.$el.html(this.model.get('title'));
		this.$el.attr('id', this.model.id);
		// return 'this' li which is a model w/ the 'title' as it's innerHTML
		return this;
	}
});

// create a songs view
// loop through model append song title
var SongsView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function() {
		this.model.on('add', this.onSongAdded, this);
		this.model.on('remove', this.onSongRemove, this);
	},
	onSongAdded: function(song) {
		var songView = new SongView({ model: song });
		this.$el.append(songView.render().$el);
	},
	onSongRemove: function(song) {
		// this.$el.find('li#' + song.id).remove();
		this.$('li#' + song.id).remove();
	},
	render: function() {
		// this embedded in a this requires an arrow function or 'self'
		// self in this case is pointing to the songsView
		// specifically the ul#songs passed through when called below
		var self = this;
		this.model.each(function(song) {
			// for each song make new 'SongView'
			var songView = new SongView({ model: song });
			// append '$el' which can be found on the results of 'songView.render'
			self.$el.append(songView.render().$el);
		});
	}
});

// create an instance of Songs
var songs = new Songs([
	new Song({ id: 1, title: 'Beautiful People' }),
	new Song({ id: 2, title: 'Antichrist Superstar' }),
	new Song({ id: 3, title: 'Dope Hat' })
]);

// create and instance of SongsView
var songsView = new SongsView({ el: '#songs', model: songs });
songsView.render();
// render
