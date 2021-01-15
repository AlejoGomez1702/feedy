import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Item } from '../place.model';
import { PlacesService } from '../places.service';
 


@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offeredPlaces: Item[];
  private placesSub: Subscription;
  isLoading = false;

  constructor(private placeServices: PlacesService, private router:Router ) { }

  ngOnInit() {
   this.placesSub= this.placeServices.items.subscribe(places =>{
    this.offeredPlaces=places;
   });
  }
  ionViewWillEnter(){
    this.isLoading= true;
    this.placeServices.getData().subscribe(()=>{
      this.isLoading=false;
    });
  }
  
  onEdit(itemId:string, slider:IonItemSliding){
    slider.close();
    console.log('Editing item', itemId);
    this.router.navigate(['/','places','tabs','offers','edit', itemId]);
  }
  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
