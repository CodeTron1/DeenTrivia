import { Component, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.page.html',
  styleUrls: ['./single-player.page.scss'],
})
export class SinglePlayerPage implements OnInit {
  // @ViewChild('slides', { read: IonSlides }) slides: IonSlides;
  // slideOpts = {
  //   effect: 'flip'
  // };
  constructor(private service: MyserviceService) { }
  allquestions = [];
  slides:any;
  sliderConfig = {
  	centeredSlides: true
  	// slidesPerView: 1.6
  }
  ngOnInit() {
 //  	var slides = document.querySelector('ion-slides');
	// slides.options = {
	//   effect: 'fade'
	// }
	// slides.lockSwipes();
	// slides.lockSwipeToNext();
	// slides.lockSwipeToPrev();
	// var swiperinstance = this.slider.getSlider();
	// console.log(swiperinstance);
	console.log('hi from sawood');
	// console.log(slides);
  	this.allquestions = this.service.getfakesingleplayer();
  	console.log(this.allquestions);
  }

  slidesloaded(slides: Slides){
  	console.log('ionslides did load');
  	console.log(slides);
  	slides.lockSwipes(true);
  	slides.slideNext();
  	this.slides = slides;
  }

  checkanswer(num, answer, event){
  	console.log('check answer '+num);
  	console.log(event);
  	if(this.allquestions[num-1].answer == answer){
  		//answer is correct
  		var slides = this.slides;
		this.slides.isEnd().then((something)=>{
			if(something == true){
				alert('Masha Allah, you have won');
			}else{
				event.originalTarget.style.backgroundColor = 'blue';
				setTimeout(function() {
					event.originalTarget.style.backgroundColor = 'green';
				}, 500);
				setTimeout(function(){
					slides.lockSwipes(false).then(()=>{
						slides.slideNext();
						slides.lockSwipes(true);
					});
				}, 500);
			}
		});
  	}else{
  		//answer is incorrect
  	}
  }

}
