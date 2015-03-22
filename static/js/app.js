$(function(){
	var submitBtn = $('#submit-btn');
	function submit () {
		var artistName = $('#artistName').val();
		var urlArtistName = "http://itunes.apple.com/search?term=" + artistName +"&entity=album&callback=?"
		var urlArtistImage = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+ artistName +"&imgsz=medium&callback=?"
		if(artistName == ''){
			alert('Inserta un artista')
			return false
		}
			$.getJSON(urlArtistImage).done(function(data){
				$('#Artist').removeClass('is-animated')
				var image = data.responseData.results[3].url
				var imageData = {
					image : image,
					artistName: artistName
				}
				this.templateImage = Handlebars.compile($('#artist-image').html());
				var templateImageData = this.templateImage(imageData)
				$('#Artist').html(templateImageData)
				setTimeout(albums(urlArtistName, artistName), 2000);
				
	 		});
		}
	function albums(urlArtistName, artistName){

		$.getJSON(urlArtistName).done(function(data){
			$('#obtainer').addClass('is-animated')
			var numberOfAlbums = data.results.length
			var numberOfAlbumdata = {
				artistName: artistName,
				numberOfAlbums: numberOfAlbums
			}
			this.numberOfAlbumTemplate = Handlebars.compile($('#numberOf-Albums').html())
			var templateNumberData = this.numberOfAlbumTemplate(numberOfAlbumdata)
			$('#Albums').append(templateNumberData)

			for (var i = 0; i<numberOfAlbums; i++){
				var Albumsdata ={
					Albumname: data.results[i].collectionName,
					Artwork: data.results[i].artworkUrl100
				}
				this.albumTemplate = Handlebars.compile($('#album-template').html())
				var templateData = this.albumTemplate(Albumsdata);
				$('#Albums').append(templateData)
			}
			$('#Artist-image').addClass('is-animated');
			$('#returnBtn').on('click', returnToSearch)
		})

	}
	function returnToSearch () {
		$('#obtainer').removeClass('is-animated')
		$('#artistName').val('')
		$('#Artist').html('')
		$('#Albums').html('')
	}

	$(submitBtn).on('click', function(){
		$('#Artist').addClass('is-animated');
		submit();
	})
	$('#artistName').keypress(function (e){
		if(e.which === 13){
			$('#Artist').addClass('is-animated')
			submit();
		};
		
	});
})