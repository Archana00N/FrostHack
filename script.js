fetch("https://endlessmedicalapi1.p.rapidapi.com/GetOutcomes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "649a0db843msh027e962805d14d4p176ccfjsna37622a4394e",
		"x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
    console.log(response.content);
})
.catch(err => {
	console.error(err);
});