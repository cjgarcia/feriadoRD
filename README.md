## FeriadoRD

Libreria <b><i>JS</i></b> para validar los días feriados en la <b>República Dominicana</b>.

Súper sencilla, consiste en una clase (FeriadoRD) y algunos métodos (prototype) que extienden al objeto <b>Date</b> de <b><i>JS</i></b>.

Con este [demo](https://dl.dropboxusercontent.com/u/36005322/Demos/feriadoRD/test.html) pueden comprobar la lista de días feriados del [2015](http://www.ministeriodetrabajo.gob.do/index.php/todas-las-noticias/651-ministerio-de-trabajo-informa-sobre-dias-feriados-correspondientes-al-ano-2015) o cualquier otra.

<img src="https://github.com/TurKux/feriadoRD/blob/master/Demo/Captura.png">

## Sobre el constructor:

Un solo argumento, un string que representa la fecha y soporta los formatos:

<ul>
    <li>mm/dd/yyyy</li> 
    <li>mm-dd-yyyy </li> 
    <li>mm.dd.yyyy</li> 
    <li>yyyy-mm-dd</li>
    <li>yyyy/mm/dd</li>
    <li>yyyy.mm.dd</li>
 </ul>
 
<b>IMPORTANTE: El año tiene que estar representado por 4 dígitos.

```javascript
 var fecha = new FeriadoRD(“18-02-2015”);
```

El obj <b>FeriadoRD</b> tendrá cuatro prop. 
<table>
    <tr>
      <td><b>resp</b></td>
      <td><b>true</b> o <b>false</b></td>
    </tr>
    <tr>
      <td><b>descp</b></td>
      <td><b>Mensaje</b> que describe el resultado de la evaluación.</td>
    </tr>
    <tr>
      <td><b>msj</b></td>
      <td><b>Mensaje</b> que describe en detalle el resultado de la evaluación.</td>
    </tr>
    <tr>
      <td><b>dia</b></td>
       <td>Un <b>número</b> entero que representa el día feriado con respecto al año.</td>
    </tr>
</table>

Si el argumento introducido al constructor no tiene el formato correcto las validaciones se reflejaran en las propiedades. De esta forma la propiedad “<b>resp</b>” arrojara “<b>false</b>”, la de “<b>msj</b>” y “<b>descp</b>” un mensaje como “<b>¡Error al tratar de validar la fecha!</b>” y “<b>dia</b>” devolverá “<b>0</b>”.

Para más info vean el source del demo.

Cualquier cosa no duden en crear un <b>issue</b> o un <b>pull request</b> .

<b><i>Happy coding!</i></b>

