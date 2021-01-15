import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Item } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  item: Item;
  itemId: string;
  private itemSub: Subscription;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private placeService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alrtCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.itemId = paramMap.get('itemId');
      this.isLoading = true;
      this.itemSub = this.placeService.getItem(paramMap.get('itemId')).subscribe(item => {
        this.item = item;
        this.form = new FormGroup({
          title: new FormControl(this.item.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.item.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(200)]
          })
        });
        this.isLoading = false;
      }, error => {
        this.alrtCtrl.create({
          header: 'An error occured!',
          message: 'Item could not be fetched. Please try again.',
          buttons: [{
            text: 'Okay', handler: () => {
              this.router.navigate(['/places/tabs/offers']);
            }
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
      );
    });
  }
  onEditItem() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating Item...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placeService.updateItem(
        this.item.id,
        this.form.value.title,
        this.form.value.description).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/offers']);
        });
    });

  }
  ngOnDestroy() {
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }
  }

}
