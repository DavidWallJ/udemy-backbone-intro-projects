var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
	events: {
		click: 'onClick',
		// any jQuery selectors work here '.bookmark'
		'click .bookmark': 'onClickBookmark'
	},
	onClick: function() {
		console.log('Listen Clicked');
	},
	onClickBookmark: function(e) {
		// stop the event from being passed to any other handlers in the chain
		e.stopPropagation();
		console.log('Bookmark Clicked');
	},
	render: function() {
		// add the title to the html of this '$el'
		this.$el.html(
			this.model.get('title') +
				' ' +
				'<button>Listen</button>' +
				'<button class="bookmark">Bookmark</button>'
		);
		// return 'this' li which is a model w/ the 'title' as it's innerHTML
		return this;
	}
});

var song = new Song({ title: 'Beautiful People' });

var songView = new SongView({ el: '#songs', model: song });
// render
songView.render();
