import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../place.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy 
{
  
  loadedPlaces: Item[];
  listedLoadedItem: Item[];
  private itemSub: Subscription;
  isLoading = false;

  // For example loop
  public discover = ['','','','',''];

  // Heart icon change True->Favorite, False->NO Favorite.
  public heartIcon: boolean = false;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.itemSub = this.placesService.items.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedItem = this.loadedPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.getData().subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
  
  ngOnDestroy() {
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }
  }

  changeHeartIcon()
  {
    this.heartIcon = !this.heartIcon;

  }

}
