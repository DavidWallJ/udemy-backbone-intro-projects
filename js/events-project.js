// create 'Vehicle' model
var Vehicle = Backbone.Model.extend({
	idAttribute: 'registrationNumber',

	urlRoot: '/api/vehicles',

	validate: function(attrs) {
		if (!attrs.registrationNumber) {
			return 'Vehicle not found.';
		}
	}
});

// create 'Vehicles' collection
var Vehicles = Backbone.Collection.extend({ model: Vehicle });

// create 'VehicleView'
var VehicleView = Backbone.View.extend({
	tagName: 'li',
	className: 'vehicle',
	events: {
		'click .delete': 'onDelete'
	},

	render: function() {
		// target the template container
		var target = $('#vehicleTemplate').html();
		// underscore function for creating a template
		var template = _.template(target);

		// 'this.model' gives the template access to the properties on the model
		this.$el.html(template(this.model.toJSON()));

		return this;
	},

	onDelete: function() {
		// remove this entire VehicleView 'li'
		this.remove();
	}
});

var VehiclesView = Backbone.View.extend({
	id: 'vehicles',

	tagName: 'ul',
	// get access to bus passed upon creating the instance
	initialize: function(args) {
		this.bus = args.bus;
		// when event 'newVehicle' is triggered call 'onNewVehicle'
		// need to specify location.  Thus, 'this'
		bus.on('newVehicle', this.onNewVehicle, this);
	},
	// registrationNumber is passed with 'trigger' event
	onNewVehicle: function(registrationNumber) {
		// create new 'Vehicle'
		var vehicle = new Vehicle({ registrationNumber: registrationNumber });
		// create new 'VehicleView'
		var vehicleView = new VehicleView({ model: vehicle });
		// prepend the 'VehicleView' li '$el' to 'this' element
		this.$el.prepend(vehicleView.render().$el);
	},

	render: function() {
		// when you have 'this' within a 'this' use 'self'
		var self = this;
		this.model.each(function(vehicle) {
			var vehicleView = new VehicleView({ model: vehicle });
			self.$el.append(vehicleView.render().$el);
		});
		return this;
	}
});

var NewVehicleView = Backbone.View.extend({
	// add an event on the click of an element with the class of 'add'
	// call 'onAdd' method
	events: {
		'click .add': 'onAdd'
	},

	initialize: function(args) {
		this.bus = args.bus;
	},

	render: function() {
		var target = $('#newVehicleTemplate').html();
		var template = _.template(target);

		this.$el.html(template());

		return this;
	},

	onAdd: function() {
		var input = this.$el.find('.registration-number');

		var registrationNumber = input.val();

		if (registrationNumber) {
			this.bus.trigger('newVehicle', registrationNumber);

			input.val('');
		}
	}
});

var bus = _.extend({}, Backbone.Events);

var vehicles = new Vehicles([
	new Vehicle({ registrationNumber: 'XLI887' }),
	new Vehicle({ registrationNumber: 'ZNP123' }),
	new Vehicle({ registrationNumber: 'XUV456' })
]);

// render 'NewVehicleView'
$('#container')
	// create an instance and render it at once
	.append(new NewVehicleView({ bus: bus }).render().$el)
	.append(new VehiclesView({ model: vehicles, bus: bus }).render().$el);
