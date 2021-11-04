var urlField = document.querySelector('.link_input')
var resField = document.querySelector('.resolution_input')
var linksList = document.querySelector('.links_list')
var videoLinks = ``
function urlIsValid(url) {
	return /[(http:\/\/)(https:\/\/)]alaatv\.com\/set\/\d+/.test(url)
}
function clicked(e){
	if ( urlIsValid(urlField.value) ){
		var i = 0
		var course = new XMLHttpRequest()
		course.open('GET', urlField.value)
		course.send()
		course.onload = function() {
			var courseHtml = document.createElement('html')
			courseHtml.innerHTML = course.responseText
			var videos = JSON.parse(courseHtml.querySelectorAll('script[type="application/ld+json"]')[1].innerHTML).itemListElement
			var intervalulate = setInterval(() => {
				if (i == videos.length-1) {
					clearInterval(intervalulate)
				}
				var videoLink = videos[i].url
				videoLinks += videoLink + '\n'
				var videoXhr = new XMLHttpRequest()
				videoXhr.open('GET', videoLink)
				videoXhr.send()
				var videoHtml = document.createElement('html')
				videoXhr.onload = function() {
					videoHtml.innerHTML = videoXhr.responseText
					var videoFile = videoHtml.querySelector(`source[res="${resField.value}"]`).src
					var videoName = JSON.parse(videoHtml.querySelector('script[type="application/ld+json"]').innerHTML).name
					if (videoName.length > 61) {
						videoName = videoName.substring(0,61) + '...'
					}
					linksList.innerHTML += `
					<li class="links_item">
						<a href="${videoLink}" class="link_item_text">${videoName}</a>
						<img class="link_item_image" onclick="window.open('${videoFile}')" src="images/dl.png" alt="دانلود لیست پخش آلا">
					</li>
					`
				}
				i++
			}, 200);
		}
	} else if ( urlField.value == '' ) {
		alert('لطفا لینک دوره مورد نظر را وارد کنید')
	} else {
		alert('لینک وارد شده اشتباه است!')
	}
	e.preventDefault()
}