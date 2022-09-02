/* Arreglo de cuentas de usuarios*/
const cuentas = [
    { email: 'mali@correo.com', password: 'mali123', nombre: 'Mali', numCuenta: '000123', saldo: 200 },
    { email: 'gera@correo.com', password: 'gera123', nombre: 'Gera', numCuenta: '000213',saldo: 290 },
    { email: 'maui@correo.com', password: 'maui123', nombre: 'Maui', numCuenta: '000321',saldo: 67 }
  ];

/* Según los requerimiento del proyecto, los usuarios no pueden tener menos de 10 o mas de 990 en su cuenta
por lo tanto creamos unas constantes para usarlas en cualquier momento y desde cualquier parte del codigo*/
const SALDO_MIN = 10;
const SALDO_MAX = 990;

//en estas variables almacenan los elementos del html para después insertar datos en el HTML con innerHTML
let consulta = document.getElementById("consulta-saldo");
let ingresar = document.getElementById("ingresar-monto");
let retirar = document.getElementById("retirar-monto");


/* FUNCION LOGIN se ejecuta desde el login  */
function login(){


    let emailLogin = document.getElementById('email').value; //se guarda el valor del elemento HTML con el ID email
    let passwordLogin = document.getElementById('password').value;  //se guarda el valor del elemento HTML con el ID password

    /*se crean las constantes para guradar el valor del primer elemento del array que cumple la función de prueba proporcionada mediante el metodo find.*/
    const USUARIO_LOG = cuentas.find(cuenta => cuenta.email === emailLogin); 
    const PASSWORD_LOG = cuentas.find(cuenta => cuenta.password === passwordLogin);


    /* El método find devuelve un undefined si no encuentra el elemento de comparacion
    por lo tanto creamos una condicianal que campare si el valor de las constantes son diferentes
    de undefined para que realice la tarea, de lo contrario mande un SWAL o una alerta*/
    if(USUARIO_LOG.email !== 'undefined' && PASSWORD_LOG.password !== 'undefined'){
        
        /* variables locales para almacenar en el localStorage ,
        USUARIO_LOG es una constatnte y se puede acceder desde cualquier 
        parte del codigo, por lo tanto podemos acceder a todos los elementos 
        que contiene y almanecarlo en una variable local para su uso
        */
        let nombre = USUARIO_LOG.nombre;
        let cuenta = USUARIO_LOG.numCuenta;
        let saldo = USUARIO_LOG.saldo;


        /* Se hace uso del LocalStorage setItem para almacenar y crear en en cache las llaves y poder utilizar valores requeridos */ 
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("cuenta", cuenta);
        localStorage.setItem("saldo", saldo);
        
       /* Se redirecciona al usuario al HTML del cajero */ 
        window.location = 'cajero.html'; 

    }else{

        /* Si no proporciona la información correcta manda esta alerta al usuario */
        Swal.fire({
            title: 'Error!',
            text: 'El usuario o la contraseña son incorrectos, inténtalo nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
    }

}

function inicio(){

    /* esta funcion se ejecuta al acceder al cajero.html ya que no se asignó a ningún evento de algún botón*/
    
    /*creamos las variables que nos permitirán obtener los valores del localStorage mediante el metodo getItem */
    let nombre = localStorage.getItem("nombre");
    let cuenta = localStorage.getItem("cuenta");
    let saldo = Number(localStorage.getItem("saldo"));  //esto permite obtener el valor actualizado del saldo   
    
    //Se escribe en el HTML el saldo inicial del usuario
    document.getElementById("saldo").innerHTML = "$ " + saldo.toFixed(2);

    //oculta o muestra elementos en el HTML con style.display 
    consulta.style.display = '';
    ingresar.style.display = 'none';
    retirar.style.display = 'none';

    //Se escribe en el HTML el nombre y el número de cuenta del usuario y se agregar un botón con la función cerrarSesion 
    document.getElementById("cuenta").innerHTML = 'Hola ' + '<strong>' + nombre + '</strong>' + ' Cuenta: ' + '<strong>' + cuenta + '</strong><br><button type="button" class="salir" onclick="cerrarSesion()">Cerrar Sesion</button>';

}
  
function vistaConsultar(){

    /* esta funcion se ejecuta mediante el botón Consultar Saldo que está en el aside*/

        let saldo = Number(localStorage.getItem("saldo")); 
        
        //Se escribe en el HTML el saldo del usuario    
        document.getElementById("saldo").innerHTML = "$ " + saldo.toFixed(2);

        //oculta o muestra elementos en el HTML con style.display 
        consulta.style.display = '';
        ingresar.style.display = 'none';
        retirar.style.display = 'none';    
  
}
  
function vistaIngresar(){
  
    /* esta funcion se ejecuta mediante el botón Ingresar Monto que está en el aside*/

  
    //oculta o muestra elementos en el HTML con style.display
    consulta.style.display = 'none';
    ingresar.style.display = '';
    retirar.style.display = 'none';

    //se limpia el input del formulario
    document.getElementById("cantidadIngreso").value = "";
  
}
  
function vistaRetirar(){

    /* esta funcion se ejecuta mediante el botón Ingresar Monto que está en el aside*/
  
    //oculta o muestra elementos en el HTML con style.display
    consulta.style.display = 'none';
    ingresar.style.display = 'none';
    retirar.style.display = '';

    //se limpia el input del formulario
    document.getElementById("cantidadRetiro").value = "";
  
}

function nuevoIngreso(){

    /* esta funcion se ejecuta mediante el botón Ingresar que está en el section*/

    //se obtiene el valor del input del formulario
    let cantidad = document.getElementById("cantidadIngreso").value;

    //se convierte en número para poder realizar operaciones ya que se obtiene como un string
    cantidad = Number(cantidad);

    //se valida si la cantidad es diferente a un numero con !isNan, si la cantidad es diferente de null y si no está vacia
    if(!isNaN(cantidad) && cantidad != null && cantidad != ""){

        //se suma la cantidad ingresada + lo que esta almacenado en localStorage
        let saldo = Number(localStorage.getItem("saldo")) + cantidad;

        
        //se valida si el nuevo saldo es mayor que el limite que puede tener en su cuenta
        if(saldo > SALDO_MAX){
            //si el nuevo saldo sobrepasa el limite manda un mensaje de error
            Swal.fire({
                title: 'Error!',
                text: 'La cantidad a ingresar sobrepasa el total que puedes tener en tu cuenta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                })
            document.getElementById("cantidadIngreso").value = "";
        }else{
            //de lo contrario manda un mensaje de operación exitosa y actualiza el saldo del localSatorage
            Swal.fire({
                icon: 'success',
                title: 'Operación exitosa',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                
                //se actualiza el saldo
                localStorage.setItem("saldo", saldo);
                vistaConsultar();
              })    
        }        
        
    }else{

        //si no se cumple la condicion de ser número, manda mensaje de error
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad que ingresaste es inválida, favor de verificar e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        document.getElementById("cantidadIngreso").value = "";
    }
}

function nuevoRetiro(){

    /* esta funcion se ejecuta mediante el botón Retirtar que está en el section*/

    //se obtiene el valor del input del formulario
    let cantidad = document.getElementById("cantidadRetiro").value;

    //se convierte en número para poder realizar operaciones ya que se obtiene como un string
    cantidad = Number(cantidad);

    //se valida si la cantidad es diferente a un numero con !isNan, si la cantidad es diferente de null y si no está vacia
    if(!isNaN(cantidad) && cantidad != null && cantidad != ""){

        //se suma la cantidad ingresada + lo que esta almacenado en localStorage
        let saldo = Number(localStorage.getItem("saldo")) - cantidad;

        //se valida si el saldo es menor de lo que debería tener en su cuenta
        if(saldo < SALDO_MIN){
            //si el nuevo saldo sobrepasa el minimo, manda un mensaje de error
            Swal.fire({
                title: 'Error!',
                text: 'La cantidad a retirar sobrepasa el mínimo que puedes tener en tu cuenta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                })
            document.getElementById("cantidadRetiro").value = "";
        }else{
            //de lo contrario manda un mensaje de operación exitosa y actualiza el saldo del localSatorage
            Swal.fire({
                icon: 'success',
                title: 'Operación exitosa',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {

                //se actualiza el saldo
                localStorage.setItem("saldo", saldo);
                vistaConsultar();
              })    
        }        
        
    }else{

        //si no se cumple la condicion de ser número, manda mensaje de error
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad que ingresaste es inválida, favor de verificar e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        document.getElementById("cantidadRetiro").value = "";
    }
}

/* esta funcion se ejecuta mediante el botón Cerrar sesión que se creó al principio dentro de la función login*/
function cerrarSesion(){
    //solamente se redirecciona a la pagina del login 
    window.location = 'index.html'; 
}

/**********************************************
FALTA CREAR LA FUNCIÓN PARA QUE NO SE BORRE LA 
CACHE AUQNUE SE REFRESQUE LA PAGÍNA 
**********************************************/