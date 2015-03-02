
/********************************************
 * FeriadoRD.js by CJ Garcia aka TurKux.
 * Find me at [fb,github,twitter].com/TurKux
 ********************************************/

//Some methods to extend Date class

//Get the day of a date in the current year
Date.prototype.getDayOY = function(){

	//Total of milliseccond since -Jan 01 of 1970-.
	var fd = new Date(this.getFullYear(), 0, 1);

	//Day of the year
	var doy = Math.ceil(((this - fd)/86400000));

	if (this.getMilliseconds() == 0) ++doy;

	return doy;
};

//Get a string of the current month.
Date.prototype.getStrMonth = function(){

	switch(this.getMonth()){
		case 0: return "enero";
		case 1: return "febrero";
		case 2: return "marzo";
		case 3: return "abril";
		case 4: return "mayo";
		case 5: return "junio";
		case 6: return "julio";
		case 7: return "agosto";
		case 8: return "septiembre";
		case 9: return "octubre";
		case 10: return "noviembre";
		case 11: return "diciembre";
	}
};

//Get a string of the current day
Date.prototype.getStrDay = function(){

	switch(this.getUTCDay()){
		case 0: return "domingo";
		case 1: return "lunes";
		case 2: return "martes";
		case 3: return "miércoles";
		case 4: return "jueves";
		case 5: return "viernes";
		case 6: return "sábado";
	}
};

//Add a day to the current date object
Date.prototype.addDays = function(day){
	this.setTime((this.getTime() + (day * 86400000)));
	return this;
};

//Func to validate an instance of a Date class
function isDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
      return false;
  return !isNaN(d.getTime());
}


//Clase

var FeriadoRD = function(date, descp){

	this.dia = (!isNaN(date))? date : 0;
	this.descp = descp;
	this.resp = false;

	var fecha = (descp) ? null : new Date(Date.parse(AjustarDMA(date)));

	if(isDate(fecha))
	{
		//Lista con los días no laborables:
		var nWD = [];

		//Llenar la lista de los días no laborables:
		DiasFC(fecha.getFullYear());
		DiasFNC(fecha.getFullYear());

		var fv = Validar(fecha.getDayOY());

		if(fv)
		{
			this.dia = fv.dia;
			this.descp = fv.descp;
			this.resp = fv.resp;
		    this.msj = "El " + fecha.getStrDay() +" "+ fecha.getUTCDate();
			this.msj += " de "+ fecha.getStrMonth() +" del "+ fecha.getFullYear();
			this.msj += " es no laborable, ya que se celebra el "+this.descp+".";
		}
		else
		{
			this.dia = fecha.getDayOY();
			this.descp = "Laborable.";
			this.msj = "El " + fecha.getStrDay() +" "+ fecha.getUTCDate();
			this.msj +=" de "+ fecha.getStrMonth() +" del "+ fecha.getFullYear();
			this.msj += " es laborable."
		}
	}
	else if(!descp)
	{
		this.msj = "¡Error al tratar de convertir la fecha!";
		this.descp = "¡Error! Entre un formato de fecha soportado.";
	}

	/****METODOS****/

	 //Ajusta la fecha al formato aaaa/mm/dd si es necesario.

	 function AjustarDMA(f)
	 {
	 	if(!isNaN(f)) return "¡Error! Tipo de dato";

	 	if (f.match(/^\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/)) return f;

 	    //Arreglo con la fecha dd/mm/aaaa
 	    var af = f.replace(/(-|\/|\.)/g,"_").split("_");

 	    if(af.length != 3 || af[2].length != 4)
 	    	return "Formato de fecha invalido";

 	    if(af[0]=="01") af[0] = "1";

        return (af[2]+"-"+af[1]+"-"+af[0]);
	 }

	/*** Ajustar el día de la fecha.
	 * Si cae Lunes, Sabado o Domingo, no cambia.
	 * Si cae de Martes a Miercoles, cambia al Lunes.
	 * Si cae de Jueves a Viernes cambia al Lunes sig.
	 */

	function AjustarDia(f)
	{
	    if ((f.getDayOY() != 121) & (f.getDay() <= 3))
	    {
	        switch (f.getDay())
	        {
	            //Martes
	            case 2: return f.addDays(-1);
	            //Miercoles
	            case 3: return f.addDays(-2);
	            //Jueves
	            case 4: return f.addDays(-3);
	            //Viernes
	            case 5: return f.addDays(-4);
	            //Si es Lunes, Sabado, o Domingo
	            default: return f;
	        }
	    }

	    switch (f.getDay())
	    {
	        //Martes
	        case 2: return f.addDays(6);
	        //Miercoles
	        case 3: return f.addDays(5);
	        //Jueves
	        case 4: return f.addDays(4);
	        //Viernes
	        case 5: return f.addDays(3);
	        //Si es Lunes, Sabado, o Domingo
	        default: return f;
	    }
	} //Fin Ajustar días

	//El Computus es el cálculo de la fecha de Pascua
	//Source => http://es.wikipedia.org/wiki/Computus
	function Computus(ano)
	{
	    var M = 25;
	    var N = 5;

	    if (ano >= 1583 && ano <= 1699) { M = 22; N = 2; }
	    else if (ano >= 1700 && ano <= 1799) { M = 23; N = 3; }
	    else if (ano >= 1800 && ano <= 1899) { M = 23; N = 4; }
	    else if (ano >= 1900 && ano <= 2099) { M = 24; N = 5; }
	    else if (ano >= 2100 && ano <= 2199) { M = 24; N = 6; }
	    else if (ano >= 2200 && ano <= 2299) { M = 25; N = 0; }

	    var a, b, c, d, e, dia, mes;

	    //Cálculo de residuos
	    a = ano % 19;
	    b = ano % 4;
	    c = ano % 7;
	    d = (19 * a + M) % 30;
	    e = (2 * b + 4 * c + 6 * d + N) % 7;

	    // Decidir entre los 2 casos:
	    if (d + e < 10) { dia = d + e + 22; mes = 3; }
	    else { dia = d + e - 9; mes = 4; }

	    // Excepciones especiales
	    if (dia == 26 && mes == 4) dia = 19;
	    if (dia == 25 && mes == 4 && d == 28 && e == 6 && a > 10) dia = 18;

	    return new Date(ano, --mes, dia);
	}

	//Retorno el obj FeriadoRD si hay coincidencia.
	function Validar(f)
	{
	    for(var i in nWD)
	       if (f == nWD[i].dia){
	       	   nWD[i].resp = true;
	       	   return nWD[i];
	       }

	   	return null;
	}

	//Agrega a la lista Días Feriados:

    //Feriados que no cambian dependiendo el día de la semana.

	function DiasFNC(ano)
	{
		 //Días que no cambian idependiente del año:
	     nWD.push(new FeriadoRD(1,"día de Año Nuevo")); //01-01
	     nWD.push(new FeriadoRD(21,"día de la Altagracia"));//21-01
	     nWD.push(new FeriadoRD(58,"día de la Independencia"));//27-02
	     nWD.push(new FeriadoRD(228,"día de la Restauración"));//16-08
	     nWD.push(new FeriadoRD(267,"día de las Mercedes"));//24-09
	     nWD.push(new FeriadoRD(359,"día de Navidad"));//25-12

	    //Días que se calculan por año.

	    //Viernes Santo
	    nWD.push(new FeriadoRD(
	        Computus(ano).addDays(-2).getDayOY(),
	        "Viernes Santo"
	    ));

	    //Corpus Christi
	    nWD.push(new FeriadoRD(
    		Computus(ano).addDays(60).getDayOY(),
            "Corpus Christi"
        ));
	}

	//Feriados que cambian dependiendo el año:

	function DiasFC(ano)
	{
	    nWD.push(new FeriadoRD(AjustarDia(new Date(ano, 0, 6)).getDayOY(),
	    	"día de los Santos Reyes")); //06-01

	    nWD.push(new FeriadoRD(AjustarDia(new Date(ano, 0, 26)).getDayOY(),
	    	"día de Duarte")); //26-01

	    nWD.push(new FeriadoRD(AjustarDia(new Date(ano, 4, 1)).getDayOY(),
	    	"día del trabajo")); //1-05

	    nWD.push(new FeriadoRD(AjustarDia(new Date(ano, 10, 6)).getDayOY(),
	    	"día de la constitución")); //06-11
	}

}//Fin FeriadoRD
