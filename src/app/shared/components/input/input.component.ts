import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTypes } from '../../interfaces';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() type: InputTypes = 'text';
  @Input() label: string = '';
  @Input() id: string;
  @Input() placeholder: string = '';
  @Input() error: any;

  control = new FormControl();
  onChange: any;
  onTouch: any;


  @ViewChild('input') inputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
