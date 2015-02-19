# FeriadoRD
Libreria <b><i>JS</i></b> para validar los días feriados en la <b>República Dominicana</b>.

Súper sencilla, consiste en una clase (FeriadoRD) y algunos métodos (prototype) que extienden al objeto <b>Date</b> de <b><i>JS</i></b>.

Con este <a href="https://dl.dropboxusercontent.com/u/36005322/Demos/feriadoRD/test.html" target= "_black">demo</a> pueden comprobar la lista de días feriados del <a href="http://www.ministeriodetrabajo.gob.do/index.php/todas-las-noticias/651-ministerio-de-trabajo-informa-sobre-dias-feriados-correspondientes-al-ano-2015" target= "_black">2015</a> o cualquier otra.

<strong>Sobre el constructor:</strong>

Un solo argumento, un string que representa la fecha y soporta los formatos:

<ul>
    <li>mm/dd/yyyy</li> 
    <li>mm-dd-yyyy </li> 
    <li>mm.dd.yyyy</li> 
    <li>yyyy-mm-dd</li>
    <li>yyyy /mm/dd</li>
    <li>yyyy.mm.dd</li>
 </ul>
 
<strong>IMPORTANTE:</strong> El año tiene que estar representado por 4 dígitos.

 <pre>var fecha = new FeriadoRD(“18-02-2015”);</pre> 

El obj fecha tendrá cuatro prop o retornara null si el formato del arg no es el correcto. La prop <b>resp</b> es un objeto <b>FeriadoRD</b> que tendrá el mensaje de validación de la fecha, de todas formas se puede obtener un mensaje para validar la creación del obj con el siguiente snippet:

<pre>var msj = (fecha.resp) ? fecha.resp.msj : fecha.msj;</pre>

Para más info vean el source del demo.

En unos días creare una Wiki, por ahora pueden crear un <b>issue</b> o un <b>pull request</b> .

<b><i>Happy coding!</i></b>

