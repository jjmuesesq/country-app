import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {
  
  //Esperar a que el usuario deje de escribir para lanzar la petición
  private debouncer: Subject<string> = new Subject<string>();
  
  @Input()
  public placeholder: string = '';
  
  @Output() 
  public onValue = new EventEmitter<string>();

  @Output() 
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }
  
  emitValue( value: string):void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string){
    //Realizar emision del debouncer
    this.debouncer.next(searchTerm);
  }
}
