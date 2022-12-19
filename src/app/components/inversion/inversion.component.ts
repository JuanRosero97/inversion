import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.scss'],
})
export class InversionComponent implements OnInit {
  tiempo = 1;
  month = 3;
  prevMonth = 3;
  start = 0;
  months: any = [];
  inversion = 4400000;
  rentabilidadFija = 11.65;

  copMes = 0;
  rentabilidad: any = 11.65;
  valorUnidad = 0;
  interes = 0.15;

  optionsS: any = {
    stepsArray: [
      { index: 1, value: 1 },
      { index: 2, value: 3 },
      { index: 3, value: 6 },
      { index: 4, value: 9 },
      { index: 5, value: 12 },
    ],
  };
  options = [
    {
      id: 1,
      nombre: 'Cuotas mensuales',
    },
    {
      id: 2,
      nombre: 'Pago único',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.calculateMonths();
    this.calculateValues();
  }

  selectOption(o: any) {
    this.tiempo = o.id;
    this.calculateValues();
  }

  onChangeMonth(event: any) {
    this.month = event.value;
    if (this.month <= this.prevMonth) this.left();
    else this.right();
    this.prevMonth = this.month;

    this.calculateValues();
  }

  calculateMonths() {
    this.months = this.optionsS.stepsArray?.slice(this.start, this.start + 3);
  }

  right() {
    if (this.start <= 1) {
      this.start++;
      this.calculateMonths();
    }
  }
  left() {
    if (this.start !== 0) {
      this.start--;
      this.calculateMonths();
    }
  }

  clickMonth(e: any) {
    this.month = e.value;
    this.calculateValues();
  }

  calculateValues() {
    if (this.tiempo === 1) {
      let mesInteres = this.month * this.interes;

      this.rentabilidad = (this.rentabilidadFija - mesInteres).toFixed(2);
      this.copMes = Math.floor(
        (this.inversion + this.inversion * this.interes) / this.month
      );
    } else {
      this.copMes = this.inversion;
      this.rentabilidad = this.rentabilidadFija;
    }
    this.valorUnidad = Math.floor(this.copMes / 100);
  }
}
