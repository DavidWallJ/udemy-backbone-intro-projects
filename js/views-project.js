// create a song model
var Vehicle = Backbone.Model.extend({
	idAttribute: 'registrationNumber',
	validate: function(attrs) {
		if (!attrs.registrationNumber) {
			return 'Vehicle not found.';
		}
	}
});

// create a song view
// get the title from 'model' argument. put it in an 'li'
var VehicleView = Backbone.View.extend({
	tagName: 'li',
	events: {
		'click .delete': 'onDelete'
	},
	render: function() {
		var target = $('#vehicleTemplate').html();
		var template = _.template(target);

		this.$el.html(template(this.model.toJSON()));
		this.$el.attr('data-color', this.model.get('color'));

		return this;
	},
	onDelete: function() {
		this.remove();
	}
});

var vehicle = new Vehicle({ registrationNumber: 'CID88D9', color: 'Blue' });

// create and instance of SongsView
var vehicleView = new VehicleView({ model: vehicle });

// render
$('#container').html(vehicleView.render().$el);
