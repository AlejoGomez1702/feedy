import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Item } from './place.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { donarLoaction } from './location.model';


interface GetFromDataBase {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  userId: string;
  location: donarLoaction;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _items = new BehaviorSubject<Item[]>([]);

  get items() {
    return this._items.asObservable();
  }

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<{ [key: string]: GetFromDataBase }>
      ('https://fypproject-cf84d.firebaseio.com/offered-items.json')
      .pipe(map(respData => {
        const item = [];
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            item.push(new Item(key,
              respData[key].title,
              respData[key].description,
              respData[key].imageUrl,
              respData[key].price,
              new Date(respData[key].dateFrom),
              new Date(respData[key].dateTo),
              respData[key].userId,
              respData[key].location
            )
            );
          }
        }
        return item;
      }),
        tap(item => {
          this._items.next(item);
        })
      );
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.httpClient.post<{ imageUrl: string, imagePath: string }>('https://us-central1-fypproject-cf84d.cloudfunctions.net/storeImage', uploadData);
  }

  getItem(id: string) {
    return this.httpClient.get<GetFromDataBase>(`https://fypproject-cf84d.firebaseio.com/offered-items/${id}.json`)
      .pipe(
        map(respData => {
          return new Item(id,
            respData.title,
            respData.description,
            respData.imageUrl,
            respData.price,
            respData.dateFrom,
            respData.dateTo,
            respData.userId,
            respData.location)
        })
      );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: donarLoaction,
    imageUrl: string
  ) {
    let generatedId: string;
    const newPlace = new Item(Math.random().toString(),
      title,
      description,
      imageUrl,
      price,
      dateFrom,
      dateTo,
      this.authService.userId,
      location
    );
    return this.httpClient.post<{ name: string }>('https://fypproject-cf84d.firebaseio.com/offered-items.json',
      { ...newPlace, id: null })
      .pipe(
        switchMap(respData => {
          generatedId = respData.name;
          return this.items;
        }),
        take(1),
        tap(items => {
          newPlace.id = generatedId;
          this._items.next(items.concat(newPlace));
        })
      );
    // return this.places.pipe(take(1), delay(1000),
    //tap(places=>{
    // this._places.next(places.concat(newPlace));
    // })
    //);
  }

  updateItem(itemId: string, title: string, description: string) {
    let updatedItem: Item[];
    return this.items.pipe(
      take(1),
      switchMap(items => {
        if (!items || items.length <= 0) {
          return this.getData();
        }
        else {
          return of(items);
        }
      }),
      switchMap(items => {
        const updatedItemIndex = items.findIndex(it => it.id === itemId);
        updatedItem = [...items];
        const oldItem = updatedItem[updatedItemIndex];
        updatedItem[updatedItemIndex] = new Item(
          oldItem.id,
          title,
          description,
          oldItem.imageUrl,
          oldItem.price,
          oldItem.dateFrom,
          oldItem.dateTo,
          oldItem.userId,
          oldItem.location
        );
        return this.httpClient.put(`https://fypproject-cf84d.firebaseio.com/offered-items/${itemId}.json`,
          { ...updatedItem[updatedItemIndex], id: null }
        );
      }), tap(() => {
        this._items.next(updatedItem);
      })
    );
  }
}
