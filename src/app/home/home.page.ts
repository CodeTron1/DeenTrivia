import { Component } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
constructor(private service: MyserviceService, private Loadctrl: LoadingController, private router: Router) { }
	load;
	ngOnInit(){
		var online: boolean = navigator.onLine;
		// this.Loadctrl.create({
		//       message: "Loading...."
		//     }).then((overlay) => {
		//       this.load = overlay;	      
		// 	  this.load.present();

			//check database status
			 //  	this.service.checkdatabase().then((data)=>{
				// 	alert(data);
				// 	this.allquestions = this.service.getallquestions();
				// 	this.load.dismiss();
				// 	// this.service.hideloading();
				// },(error:any)=>{
				// 	alert(error);
				// 	this.load.dismiss();
				// });
			//check database ends

			//setallquestions start				
			// this.service.setallquestions().then((data)=>{
			// 	console.log(data);
			// 	this.load.dismiss();				
			// },(error)=>{
			// 	console.log(error);
			// 	this.load.dismiss();				
			// });
			//set all questions ends

			//
			//
		//});//loading controller created(end)		    
	}

	playmarathon(){
		this.service.setmarathon();
		this.router.navigate(['marathon']);
	}

	playsingleplayer(){
		this.service.setsingleplayer();
		this.router.navigate(['single-player']);
	}

	playfakesingleplayer(){
		this.service.setfakesingleplayer();
		this.router.navigate(['single-player']);
	}

	playmultiplayer(){
		this.service.setmultiplayer();
		this.router.navigate(['multi-player']);
	}
}
