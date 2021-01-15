import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

import { Item } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Item;
  private itemSub: Subscription;
  isLoading = false;

  constructor(
    private navCtrl: NavController,
    private placeService: PlacesService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alrtCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.itemSub = this.placeService.getItem(paramMap.get('itemId')).subscribe(place => {
        this.place = place;
        this.isLoading = false;
      }, error => {
        this.alrtCtrl.create({
          header: 'An error occured!',
          message: 'Could not load item.',
          buttons: [{
            text: 'Okay', handler: () => {
              this.router.navigate(['/places/tabs/discover']);
            }
          }
          ]
        }).then(alertEl => alertEl.present());
      });
    });

  }

  
  ngOnDestroy() {
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }
  }

  onShowMap() {
    this.modalCtrl.create({
      component: MapModalComponent, componentProps: {
        center: { lat: this.place.location.lat, lng: this.place.location.lng },
        selectAble: false,
        closeButtonText: 'Close',
        title: this.place.location.address
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }
}
