var person = {
	name: 'David',
	walk: function() {
		this.trigger('walking', {
			speed: 1,
			startTime: '08:00'
		});
	}
};

_.extend(person, Backbone.Events);

// once = 'on' only once
person.once('walking', function(e) {
	console.log("I'm walking here");
	console.log(e);
});

// off unsubscribes from the event
// person.off('walking');

person.walk();
person.walk();
