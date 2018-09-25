function FeriadoRD(date, description, isHoliday) {
  /** Props **/

  this.date = date;
  this.message = 'The object FeriadoRD was successfully created!';
  this.description = description || '';
  this.isHoliday = isHoliday || true;

  /** Methods **/

  //Total of milliseccond since 01/01/1970
  let getDayOfAYear = date => {
    if (isDate(date)) {
      const millisToNow = new Date(date.getFullYear(), 0, 1);
      //Day of the year
      let doy = Math.ceil((date - millisToNow) / 86400000);
      if (date.getMilliseconds() == 0) ++doy;
      return doy;
    } else {
      return 0;
    }
  };

  //Get a string representation of the current month in spanish
  let getStrMonth = date => {
    switch (date.getMonth()) {
      case 0:
        return 'enero';
      case 1:
        return 'febrero';
      case 2:
        return 'marzo';
      case 3:
        return 'abril';
      case 4:
        return 'mayo';
      case 5:
        return 'junio';
      case 6:
        return 'julio';
      case 7:
        return 'agosto';
      case 8:
        return 'septiembre';
      case 9:
        return 'octubre';
      case 10:
        return 'noviembre';
      case 11:
        return 'diciembre';
    }
  };

  //Get a string of the current day in spanish
  let getStrDay = date => {
    switch (date.getUTCDay()) {
      case 0:
        return 'domingo';
      case 1:
        return 'lunes';
      case 2:
        return 'martes';
      case 3:
        return 'miércoles';
      case 4:
        return 'jueves';
      case 5:
        return 'viernes';
      case 6:
        return 'sábado';
    }
  };

  //Add a day to the current date object
  let addDay = (date, day) => {
    date.setTime(date.getTime() + day * 86400000);
    return date;
  };

  //This func compare two dates objects
  let sameDate = (a, b) => {
    return getDayOfAYear(a) === getDayOfAYear(b);
  };

  //Func to validate an instance of a Date class
  let isDate = date => {
    return date instanceof Date;
  };

  //Get the type of the date param
  let getType = date => {
    return Object.prototype.toString.call(date);
  };

  /*This func validate the format of the 
  string to be use to parse a date object*/

  let valDateFormat = str => {
    let pattern = /((((0[13578]|1[02])\/(0[1-9]|1[0-9]|2[0-9]|3[01]))|((0[469]|11)\/(0[1-9]|1[0-9]|2[0-9]|3[0]))|((02)(\/(0[1-9]|1[0-9]|2[0-8]))))\/(19([6-9][0-9])|20([0-9][0-9])))|((02)\/(29)\/(19(6[048]|7[26]|8[048]|9[26])|20(0[048]|1[26]|2[048])))/;

    return pattern.test(str);
  };

  //Validate the date param
  let valiDate = value => {
    //if the value is a instance of a date object
    if (isDate(value)) {
      return value;
    }

    /* If the value isn't a date instance, then, i get the type of the "date" var
    and try to convert to a date instance representation */

    try {
      switch (getType(value)) {
        case '[object Undefined]':
          this.message = 'Not "date" was defined';
          throw new Error(this.message);
        case '[object Number]':
          return new Date(value);
        case '[object String]':
          if (!valDateFormat(value)) {
            this.message = 'Wrong string format. Use MM/DD/YYYY';
            throw new Error(this.message);
          }
          return new Date(Date.parse(value));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //Adjust the day for the holidays in Dominican Republic
  let adjustDay = date => {
    /*
      Párrafo.- Cuando el 1º de mayo, día Internacional del Trabajo coincida con el día
          domingo, de la semana, su carácter no laborable tendrá vigencia el lunes siguiente. 
    
    */

    if (getDayOfAYear(date) === 121 && date.getDay() === 0) {
      return addDay(date, 1);
    }

    /* Ley No.139-97 
    
        1) Martes y miércoles el lunes precedente.
        2) Jueves y viernes el lunes siguiente. 
    */

    switch (date.getDay()) {
      //Martes
      case 2:
        return addDay(date, -1);
      //Miercoles
      case 3:
        return addDay(date, -2);
      //Jueves
      case 4:
        return addDay(date, 4);
      //Viernes
      case 5:
        return addDay(date, 3);
      //Si es Lunes, Sabado, o Domingo
      default:
        return date;
    }
  };

  //Computus is a method to get the Easter day.
  //Source => http://es.wikipedia.org/wiki/Computus

  let computus = year => {
    let m = 25,
      n = 5;

    if (year >= 1583 && year <= 1699) {
      m = 22;
      n = 2;
    } else if (year >= 1700 && year <= 1799) {
      m = 23;
      n = 3;
    } else if (year >= 1800 && year <= 1899) {
      m = 23;
      n = 4;
    } else if (year >= 1900 && year <= 2099) {
      m = 24;
      n = 5;
    } else if (year >= 2100 && year <= 2199) {
      m = 24;
      n = 6;
    } else if (year >= 2200 && year <= 2299) {
      m = 25;
      n = 0;
    }

    let a, b, c, d, e, day, month;

    //Get the mod
    a = year % 19;
    b = year % 4;
    c = year % 7;
    d = (19 * a + m) % 30;
    e = (2 * b + 4 * c + 6 * d + n) % 7;

    //Choose between the 2 cases:
    if (d + e < 10) {
      day = d + e + 22;
      month = 3;
    } else {
      day = d + e - 9;
      month = 4;
    }

    // Special execeptions
    if (day == 26 && month == 4) day = 19;
    if (day == 25 && month == 4 && d == 28 && e == 6 && a > 10) day = 18;

    return new Date(year, --month, day);
  };

  //Method to get all the holidays
  let getHolidays = date => {
    let holidays = [];

    if (date) {
      let year = date.getFullYear();

      //Hlidays that doesn't change with the year:
      holidays.push(new FeriadoRD(new Date(year, 0, 21), 'Altagracia')); //21-01
      holidays.push(new FeriadoRD(new Date(year, 1, 27), 'Independencia')); //27-02
      holidays.push(new FeriadoRD(new Date(year, 0, 1), 'Año nuevo')); //01-01
      holidays.push(new FeriadoRD(new Date(year, 7, 16), 'Restauración')); //16-08
      holidays.push(new FeriadoRD(new Date(year, 8, 24), 'Virgen Mercedes')); //24-09
      holidays.push(new FeriadoRD(new Date(year, 11, 25), 'Navidad')); //25-12

      //Holidays that changes with the year:

      //Santos Reyes Magos: 06-01
      holidays.push(
        new FeriadoRD(adjustDay(new Date(year, 0, 6)), 'Santos Reyes Magos')
      );

      //Natalicio de Juan Pablo Duarte
      holidays.push(
        new FeriadoRD(
          adjustDay(new Date(year, 0, 26)),
          'Natalicio de Juan Pablo Duarte'
        )
      );

      //Internacional de los Trabajadores: 01-05
      holidays.push(
        new FeriadoRD(
          adjustDay(new Date(year, 4, 1)),
          'Internacional de los Trabajadores'
        )
      );

      //Constitución de la República Dominicana: 06-11
      holidays.push(
        new FeriadoRD(
          adjustDay(new Date(year, 10, 6)),
          'Constitución de la Rep. Dominicana'
        )
      );

      /* Special cases: */

      //Viernes Santo
      holidays.push(new FeriadoRD(addDay(computus(year), -2), 'Viernes Santo'));

      //Corpus Christi
      holidays.push(
        new FeriadoRD(addDay(computus(year), 60), 'Corpus Christi')
      );
    }

    return holidays;
  };

  //Get a cool description well formated :D
  let getDescription = holiday => {
    let strDesc = `El ${getStrDay(this.date)} ${this.date.getDate()} `;
    strDesc += `de ${getStrMonth(this.date)} `;
    strDesc += `(${this.date.getFullYear()}) es laborable.`;

    if (holiday) {
      strDesc = `El ${getStrDay(holiday.date)} ${holiday.date.getDate()} de`;
      strDesc += ` ${getStrMonth(holiday.date)} `;
      strDesc += `(${this.date.getFullYear()}) es feriado. `;
      strDesc += `Se celebra el día de ${holiday.description}.`;
    }

    return strDesc;
  };

  //Check is the date is a holiday
  let check = date => {
    let holidays = getHolidays(date);
    return holidays.find(f => sameDate(f.date, date));
  };

  //Init
  ((date, description) => {
    if (!description) {
      this.date = valiDate(date);
      let holiday = check(this.date);

      if (holiday) {
        this.description = getDescription(holiday);
      } else {
        this.description = getDescription();
        this.isHoliday = false;
      }
    }
  })(date, description);
} //Tha's all folks :P
