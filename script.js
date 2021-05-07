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

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
