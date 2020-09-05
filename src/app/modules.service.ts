import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  moduleName = new Subject();

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>('./api/modules');
  }

  getOne(_id: string) {
    console.log(_id);
    return this.http.get<any[]>('./api/modulesInfo/' + _id);
  }

  //admin insert mod
  insert(
    moduleName: string,
    category: string,
    classSize: number,
    info: string,
    venue: string,
    modulePic: string,
    modulePic2: string,
    Mon11to1: boolean,
    Tues11to1: boolean,
    Wed11to1: boolean,
    Thurs11to1: boolean,
    Fri11to1: boolean,
    Mon4to6: boolean,
    Tues4to6: boolean,
    Wed4to6: boolean,
    Thurs4to6: boolean,
    Fri4to6: boolean
  ) {
    return this.http.post<any[]>('./api/modules/', {
      'moduleName': moduleName,
      'category': category,
      'classSize': classSize,
      'info': info,
      'venue': venue,
      'modulePic': modulePic,
      'modulePic2': modulePic2,
      'Mon11to1': Mon11to1,
      'Tues11to1': Tues11to1,
      'Wed11to1': Wed11to1,
      'Thurs11to1': Thurs11to1,
      'Fri11to1': Fri11to1,
      'Mon4to6': Mon4to6,
      'Tues4to6': Tues4to6,
      'Wed4to6': Wed4to6,
      'Thurs4to6': Thurs4to6,
      'Fri4to6': Fri4to6
    });
  }

  //admin update mod
  updateMod(
    _id: string,
    moduleName: string,
    category: string,
    classSize: number,
    info: string,
    venue: string,
    modulePic: string,
    modulePic2: string,
    Mon11to1: boolean,
    Tues11to1: boolean,
    Wed11to1: boolean,
    Thurs11to1: boolean,
    Fri11to1: boolean,
    Mon4to6: boolean,
    Tues4to6: boolean,
    Wed4to6: boolean,
    Thurs4to6: boolean,
    Fri4to6: boolean
  ) {
    return this.http.put<any[]>('./api/updateMod/' + _id, {
      'moduleName': moduleName,
      'category': category,
      'classSize': classSize,
      'info': info,
      'venue': venue,
      'modulePic': modulePic,
      'modulePic2': modulePic2,
      'Mon11to1': Mon11to1,
      'Tues11to1': Tues11to1,
      'Wed11to1': Wed11to1,
      'Thurs11to1': Thurs11to1,
      'Fri11to1': Fri11to1,
      'Mon4to6': Mon4to6,
      'Tues4to6': Tues4to6,
      'Wed4to6': Wed4to6,
      'Thurs4to6': Thurs4to6,
      'Fri4to6': Fri4to6
    });
  }

  //admin delete mod
  delete(_id: string) {
    return this.http.delete<any[]>('./api/deleteMod/' + _id);
  }

  increaseQuote(_id: string, classSize: number) {
    return this.http.put<any[]>('./api/classSizes/' + _id, {'classSize': classSize });
  }

}
