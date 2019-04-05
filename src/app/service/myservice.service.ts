import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
	private allquestions = [];
	something:string = 'sawood';
  constructor(public httpClient: HttpClient, private sqlite: SQLite) { }
  setallquestions(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get("http://codetron.co.in/deentrivia/API/v1/rest.php?method=getallquestions")
      .subscribe(
      (data:any) =>{
      	this.allquestions = data;
        resolve(data);
     	},(error:any)=>{
        console.log(error);
        reject();
      });
    });
  }

  getallquestions(){
  	return this.allquestions;
  }

  checkdatabase(){
    return new Promise((resolve,reject)=>{
      	this.sqlite.create({
		  name: 'deentrivia.db',
		  location: 'default'
		})
		  .then((db: SQLiteObject) => {
		    db.executeSql('create table IF NOT EXISTS deentrivia(id INT(10) PRIMARY KEY, question VARCHAR(500) NOT NULL, option1 VARCHAR(200) NOT NULL, option2 VARCHAR(200) NOT NULL, option3 VARCHAR(200) NOT NULL, option4 VARCHAR(200) NOT NULL, answer INT(1) NOT NULL, date_entered VARCHAR(30), date_modified VARCHAR(30), deleted INT(1), difficulty INT(5), category VARCHAR(20), image VARCHAR(100), audio VARCHAR(100), version INT(5), delete_date VARCHAR(20), extra3 VARCHAR(50))', [])
		      .then(() => {
		      	alert("table created");
		      	db.executeSql("select * from deentrivia WHERE deentrivia.deleted='0'",[])//"INSERT INTO deentrivia(question, option1, option2, option3, option4, answer, date_entered, date_modified, deleted, difficulty, category, image, audio, version, delete_date, extra3) VALUES ('What is the name of our prophet', 'Nasir', 'Ehsaan', 'Muhammad', 'Mujeeb', 3, '2019-03-09 14:10:13', '2019-03-09 14:10:13', 0, 0, 'prophet', NULL, NULL, 0, '', '');", [])
		      	.then((data)=>{
		      		if(data.rows.length <= 0){
		      			db.executeSql("INSERT INTO deentrivia(question, option1, option2, option3, option4, answer, date_entered, date_modified, deleted, difficulty, category, image, audio, version, delete_date, extra3) VALUES ('What is the name of our prophet?', 'Nasir', 'Ehsaan', 'Muhammad', 'Mujeeb', 3, '2019-03-09 14:10:13', '2019-03-09 14:10:13', 0, 0, 'prophet', NULL, NULL, 0, '', '');", []);
		      			db.executeSql("INSERT INTO deentrivia(question, option1, option2, option3, option4, answer, date_entered, date_modified, deleted, difficulty, category, image, audio, version, delete_date, extra3) VALUES ('Who was the first prophet in the world?', 'Nooh A.S (Noah)', 'Aadam A.S (Adam)', 'Muhammad', 'Ibraheem(Abraham)', 2, '2019-03-09 14:10:13', '2019-03-09 14:10:13', 0, 0, 'all prophets', NULL, NULL, 0, '', '');", [])
		      			.then((data)=>{})
		      			.catch((e)=>{
		      				reject("could not INSERT into table");
		      			});
		      			// this.allquestions.push({id:"1", no:"1", question:"What is the name of our prophet", option1:"Nasir", option2:"Ehsaan", option3:"Muhammad", option4:"Mujeeb", answer:"3", difficulty:"0", category:"prophet", image:"NULL", audio:"NULL", version:"0"});
		      			// this.allquestions.push({id:"1", no:"1", question:"Who was the first prophet in the world?", option1:"Nooh A.S (Noah)", option2:"Aadam A.S (Adam)", option3:"Muhammad", option4:"Ibraheem(Abraham)", answer:"2", difficulty:"0", category:"allprophets", image:"NULL", audio:"NULL", version:"0"});
		      		}
		      		else{
		      			for(var i=0;i<data.rows.length;i++){		      			
							var online: boolean = navigator.onLine;
							if(online){
								//app has internet connection, download more questions from the server.
								db.executeSql("SELECT DISTINCT MAX('version') FROM deentrivia", [])
								.then((data)=>{
									let version = parseInt(data.rows.item(0)['version'])+1;
									this.httpClient.get("http://codetron.co.in/deentrivia/API/v1/rest.php?method=getnextversion&version="+version)
								    .subscribe((data:any) => {
								      	//this.allquestions = data;
								        resolve(data);
								     	},(error:any)=>{
								        // console.log(error);
								        reject();
								    });
								});						    	
							} 
		      				// this.allquestions.push({id:data.rows.item(i)["id"], no:i+1, question:data.rows.item(i)["question"], option1:data.rows.item(i)["option1"], option2:data.rows.item(i)["option2"], option3:data.rows.item(i)["option3"], option4:data.rows.item(i)["option4"], answer:data.rows.item(i)["answer"], difficulty:data.rows.item(i)["difficulty"], category:data.rows.item(i)["category"], image:data.rows.item(i)["image"], audio:data.rows.item(i)["audio"], version:data.rows.item(i)["version"]});
		      			}
		      		}
		      		alert(JSON.stringify(this.allquestions));
		      		resolve('allquestions set');
		      	})
		      	.catch((e)=>{
		      		reject("could not select from table");
		      	});		      	
		      })
		      .catch((e) => {//query couldn't be run
		      	reject("could not create table");
		      });
		  })
		  .catch((e) => {//sqlite couldn't be created
		  	reject("could not open database");
		  });
    });//promise ends
  }

  setmultiplayer(){
  	console.log('setting multiplayer');
  }

  setfakesingleplayer(){
  	this.allquestions.push({id:"1", no:"1", question:"What is the name of our prophet", option1:"Nasir", option2:"Ehsaan", option3:"Muhammad", option4:"Mujeeb", answer:"3", difficulty:"0", category:"prophet", image:"NULL", audio:"NULL", version:"0"});
	this.allquestions.push({id:"2", no:"2", question:"Who was the first prophet in the world?", option1:"Nooh A.S (Noah)", option2:"Aadam A.S (Adam)", option3:"Muhammad", option4:"Ibraheem(Abraham)", answer:"2", difficulty:"0", category:"allprophets", image:"NULL", audio:"NULL", version:"0"});
  }

  getfakesingleplayer(){
  	return this.allquestions;
  }

  setsingleplayer(){
  	this.sqlite.create({
	  name: 'deentrivia.db',
	  location: 'default'
	})
	.then((db: SQLiteObject) => {
	  	var qn = 1;
	  	console.log('setting single player');
	  	db.executeSql("SELECT * FROM deentrivia WHERE difficulty='0' ORDER BY rand() limit 5", [])
		.then((data)=>{
			for(let i=0;i<data.rows.length;i++){
				this.allquestions.push({id:data.rows.item(i)['id'], no:qn++, question:data.rows.item(i)['question'], option1:data.rows.item(i)['option1'], option2:data.rows.item(i)['option2'], option3:data.rows.item(i)['option3'], option4:data.rows.item(i)['option4'], answer:data.rows.item(i)['answer'], difficulty:data.rows.item(i)['difficulty'], category:data.rows.item(i)['category'], image:data.rows.item(i)['image'], audio:data.rows.item(i)['audio'], version:data.rows.item(i)['version']});
			}
		});
		db.executeSql("SELECT * FROM deentrivia WHERE difficulty='1' ORDER BY rand() limit 5", [])
		.then((data)=>{
			for(let i=0;i<data.rows.length;i++){
				this.allquestions.push({id:data.rows.item(i)['id'], no:qn++, question:data.rows.item(i)['question'], option1:data.rows.item(i)['option1'], option2:data.rows.item(i)['option2'], option3:data.rows.item(i)['option3'], option4:data.rows.item(i)['option4'], answer:data.rows.item(i)['answer'], difficulty:data.rows.item(i)['difficulty'], category:data.rows.item(i)['category'], image:data.rows.item(i)['image'], audio:data.rows.item(i)['audio'], version:data.rows.item(i)['version']});
			}
		});
		db.executeSql("SELECT * FROM deentrivia WHERE difficulty='2' ORDER BY rand() limit 5", [])
		.then((data)=>{
			for(let i=0;i<data.rows.length;i++){
				this.allquestions.push({id:data.rows.item(i)['id'], no:qn++, question:data.rows.item(i)['question'], option1:data.rows.item(i)['option1'], option2:data.rows.item(i)['option2'], option3:data.rows.item(i)['option3'], option4:data.rows.item(i)['option4'], answer:data.rows.item(i)['answer'], difficulty:data.rows.item(i)['difficulty'], category:data.rows.item(i)['category'], image:data.rows.item(i)['image'], audio:data.rows.item(i)['audio'], version:data.rows.item(i)['version']});
			}
		});
	});
  }

  setmarathon(){
  	console.log('setting marathon');
  }

}
