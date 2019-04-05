import { Component, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.page.html',
  styleUrls: ['./single-player.page.scss'],
})
export class SinglePlayerPage implements OnInit {
  @ViewChild('slides', { read: IonSlides }) slides: IonSlides;
  // slideOpts = {
  //   effect: 'flip'
  // };
  constructor(private service: MyserviceService) { }
  allquestions = [];
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

  SlidesDidLoad(slides: Slides){
  	console.log(slides);
  }

}
