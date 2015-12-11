window.ArtistView = Backbone.View.extend({
	el: '.Artist',
	initialize: function(){
		this.setElement($('.Artist'));
	},
	fillInfo: function(artistName){
		$.ajax({
			data: {
				artist: artistName,
				api_key: '42f75f939105d2110d6a0daf27db431c',
				format: 'json',
				method: 'artist.getinfo'
			},
			url: 'http://ws.audioscrobbler.com/2.0/'
		}).done(function(data){
			$('.Artist-image img').attr('src', data.artist.image[3]['#text'])
			$('.Artist-name').text(data.artist.name);
			$('.Artist-image').removeClass('is-animated');
		})
	}
});
window.SearchView = Backbone.View.extend({
	el: '.Obtainer',
	events: {
		'click #submit-btn': 'goToSearch',
		'keypress #artistName': 'keyHandler'
	},
	initialize: function(){
    	this.setElement($('.Obtainer'));
    	this.collection = window.albumCollection;
    	this.collection.on('add', function(model){
    		var videoHTML = window.templates.albumTemplate(model.toJSON());
			$('.Layout-albums').append(videoHTML);
			$('.Layout-albums').addClass('is-active');
    	});
	},
	keyHandler: function(e){
		if(e.which == 13){
			this.goToSearch();
		}
	},
	goToSearch: function(){
		$('.Artist-image').addClass('is-animated');
		var artistName = this.$el.find('input').val();
		artistInfo.fillInfo(artistName);
		this.collection.searchAlbum(artistName);
		this.$el.find('input').val('');
		$('.Layout-albums').html('');
	},
	render: function(){

	}
});
window.AlbumSearch = Backbone.Collection.extend({
	searchAlbum : function(value){
		var itunes = $.getJSON('https://itunes.apple.com/search?term=='+ value +'&entity=album&callback=?');
		itunes.done(function(data){
			var albums = data.results.map(function(item){
				return{
					title : item.collectionName,
					image : item.artworkUrl100
				}
			});
			albums.forEach(function(albumData){
				albumCollection.add(albumData);
			});
		});
	}
});
$(document).on('ready', function(){
	window.templates = {};
	window.albumCollection = new window.AlbumSearch();
	window.searchBox = new window.SearchView();
	window.artistInfo = new window.ArtistView();
	window.templates.albumTemplate = _.template($('#albumTemplate').html());
});