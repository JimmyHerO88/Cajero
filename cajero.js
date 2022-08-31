//let usuarioActual;

const cuentas = [
    { email: 'mali@correo.com', password: 'mali123', nombre: 'Mali', numCuenta: '000123', saldo: 200 },
    { email: 'gera@correo.com', password: 'gera123', nombre: 'Gera', numCuenta: '000213',saldo: 290 },
    { email: 'maui@correo.com', password: 'maui123', nombre: 'Maui', numCuenta: '000321',saldo: 67 }
  ];

function login(){
    let emailLogin = document.getElementById('email').value;
    let passwordLogin = document.getElementById('password').value;
    const USUARIO_LOG = cuentas.find(cuenta => cuenta.email === emailLogin);
    const PASSWORD_LOG = cuentas.find(cuenta => cuenta.password === passwordLogin);

    if(USUARIO_LOG.email !== 'undefined' && PASSWORD_LOG.password !== 'undefined'){
        
        let nombre = USUARIO_LOG.nombre;
        let cuenta = USUARIO_LOG.numCuenta;
        let saldo = USUARIO_LOG.saldo;

        localStorage.setItem("nombre", nombre);
        localStorage.setItem("cuenta", cuenta);
        localStorage.setItem("saldo", saldo);
        
        window.location = 'cajero.html'; 

    }else{
        Swal.fire({
            title: 'Error!',
            text: 'El usuario o la contraseña son incorrectos, inténtalo nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
    }

}

function inicio(){
    let consulta = document.getElementById("consulta-saldo");
    let ingresar = document.getElementById("ingresar-monto");
    let retirar = document.getElementById("retirar-monto");
    let nombre = localStorage.getItem("nombre");
    let cuenta = localStorage.getItem("cuenta");
  
    consulta.style.display = 'none';
    ingresar.style.display = 'none';
    retirar.style.display = 'none';

    document.getElementById("cuenta").innerHTML = 'Hola ' + '<strong>' + nombre + '</strong>' + ' Cuenta: ' + '<strong>' + cuenta + '</strong>';

  }
  
  function vistaConsultar(){
  
    let consulta = document.getElementById("consulta-saldo");
    let ingresar = document.getElementById("ingresar-monto");
    let retirar = document.getElementById("retirar-monto");

    let saldo = localStorage.getItem("saldo");    
  
    document.getElementById("saldo").innerHTML = "$ " + Number(saldo).toFixed(2);

    consulta.style.display = '';
    ingresar.style.display = 'none';
    retirar.style.display = 'none';
  
  }
  
  function vistaIngresar(){
  
    let consulta = document.getElementById("consulta-saldo");
    let ingresar = document.getElementById("ingresar-monto");
    let retirar = document.getElementById("retirar-monto");
  
    consulta.style.display = 'none';
    ingresar.style.display = '';
    retirar.style.display = 'none';
  
  }
  
  function vistaRetirar(){
  
    let consulta = document.getElementById("consulta-saldo");
    let ingresar = document.getElementById("ingresar-monto");
    let retirar = document.getElementById("retirar-monto");
  
    consulta.style.display = 'none';
    ingresar.style.display = 'none';
    retirar.style.display = '';
  
  }

  function nuevoIngreso(){
    let cantidad = document.getElementById("cantidadIngreso").value;

    cantidad = Number(cantidad);
    if(!isNaN(cantidad) && cantidad != null && cantidad != ""){

        

    }else{
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad que ingresaste es inválida, favor de verificar e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        document.getElementById("cantidadIngreso").value = "";
    }
  }