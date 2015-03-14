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
		console.log(urlArtistImage)
		$.getJSON(urlArtistImage).done(function(data){
			var image = data.responseData.results[2].url
			var imageData = {
				image : image
			}
			this.templateImage = Handlebars.compile($('#artist-image').html());
			var templateImageData = this.templateImage(imageData)
			$('#Artist').append(templateImageData)
 		});

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
				$('#returnBtn').on('click', returnToSearch)
		})
	}
	function returnToSearch () {
		$('#obtainer').removeClass('is-animated')
		$('#Albums').html('')
	}
	$(submitBtn).on('click', submit)
	$('#artistName').keypress(function (e){
		if(e.which == 13){
			submit();
		}
	})
})