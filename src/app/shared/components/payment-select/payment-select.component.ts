import { Component, ElementRef, forwardRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';
import { PaymentService } from 'src/app/core/services/payment.service';
import { CreditCard, PaymentMethod } from '../../types';

@Component({
  selector: 'app-payment-select',
  templateUrl: './payment-select.component.html',
  styleUrls: ['./payment-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaymentSelectComponent),
      multi: true,
    },
  ],
})
export class PaymentSelectComponent extends SelectControlValueAccessor implements OnInit {
  creditCards: CreditCard[];

  override value: any;

  override onChange: (_: any) => void;

  override onTouched: () => void;

  control = new FormControl(PaymentMethod.Cash);

  public PaymentMethod = PaymentMethod;

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef,
    public paymentService: PaymentService,
  ) {
    super(_renderer, _elementRef);
    this.control.valueChanges.subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  ngOnInit(): void {
    this.paymentService.getAllCreditCards().subscribe((cards: CreditCard[]) => {
      this.creditCards = cards;
    });
  }

  override writeValue(value: string): void {
    this.control.setValue(value);
  }

  override registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  override registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
