var Song = Backbone.Model.extend({
	defaults: {
		listeners: 0
	}
});

var SongView = Backbone.View.extend({
	initialize: function() {
		// paramaters: on what, do what, where(what context)
		this.model.on('change', this.render, this);
	},
	render: function() {
		// add the title to the html of this '$el'
		this.$el.html(
			this.model.get('title') + ' - Listeners: ' + this.model.get('listeners')
		);
		// return 'this' li which is a model w/ the 'title' as it's innerHTML
		return this;
	}
});

var song = new Song({ title: 'Beautiful People' });

var songView = new SongView({ el: '#songs', model: song });

songView.render();
