import { Component } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-calci',
  templateUrl: './calci.page.html',
  styleUrls: ['./calci.page.scss'],
})
export class CalciPage {
  value = '0';
  oldValue = '0';

  lastOperator = 'x';
  readyForNewInput = true;
  numberGroups = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];

  onButtonPress(symbol) {
    console.log(symbol);

    if (isNumber(symbol)) {
      console.log('is a number');
      if (this.readyForNewInput)
        this.value = '' + symbol;
      else
        this.value += '' + symbol;
      this.readyForNewInput = false;
    }
    else if (symbol === 'c') {
      this.value = '0';
      this.readyForNewInput = true;
    }
    else if (symbol === '=') {
      if (this.lastOperator === 'x')
        this.value = '' + (parseInt(this.oldValue) * parseInt(this.value));
      else if (this.lastOperator === '-')
        this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
      else if (this.lastOperator === '+')
        this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
      else if (this.lastOperator === '/')
        this.value = '' + (parseInt(this.oldValue) / parseInt(this.value));
      this.readyForNewInput = true;
    }
    else { // operator
      this.readyForNewInput = true;
      this.oldValue = this.value;
      this.lastOperator = symbol;
    }
  }
}