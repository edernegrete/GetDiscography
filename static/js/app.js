$(function(){

	var submitBtn = $('#submit-btn');
	
	function submit () {
		var artistName = $('#artistName').val();
		var url = "http://itunes.apple.com/search?term=" + artistName +"&entity=album&callback=?"
		if(artistName == ''){
			alert('Inserta un artista')
			return false
		}
		$.getJSON(url).done(function(data){
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
	
})