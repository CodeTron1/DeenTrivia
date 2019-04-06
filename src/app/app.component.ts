import { Component } from '@angular/core';
import { MyserviceService } from './service/myservice.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
	{
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Multi Player',
      url: '/multi-player',
      icon: 'people'
    },
    {
      title: 'Marathon',
      url: '/marathon',
      icon: 'bicycle'
    },
    {
      title: 'Single Player',
      url: '/single-player',
      icon: 'play'
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: 'glasses'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private service: MyserviceService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  gotohome(){    
    this.router.navigate(['home']);
  }

  showprofile(){
    this.router.navigate(['profile']);
  }

  showaboutus(){
    this.router.navigate(['about-us']);
  }

  playmarathon(){
    this.service.setmarathon();
    this.router.navigate(['marathon']);
  }

  playsingleplayer(){
    this.service.setsingleplayer();
    this.router.navigate(['single-player']);
  }

  playmultiplayer(){
    this.service.setmultiplayer();
    this.router.navigate(['multi-player']);
  }
}
