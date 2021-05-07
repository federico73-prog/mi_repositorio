/*Se actualizan las variables carrito (array) y totalCarrito con lo que se encuentra en localstorage*/
carrito = JSON.parse(localStorage.getItem("productos"));
totalCarrito = parseInt(localStorage.getItem("total"));
precioDolar = 0;
console.log(totalCarrito);

/*Muestra un detalle del carrito en una tabla y lo agrega al html*/
let tablaCarrito = "<table class= tabla__compra >";
        tablaCarrito =tablaCarrito+ `<thead><tr><th>Numero</th> <th>Producto</th><th> Precio </th><th> Cantidad</th><th> Precio final</th></tr></thead>`;
        for(item of carrito){
            tablaCarrito = tablaCarrito + `<tr> 
                                            <td> ${item.numeroItem+1} </td> 
                                            <td> ${item.producto.nombreProducto} </td> 
                                            <td> $ ${item.producto.precioProducto},00 </td> 
                                            <td> ${item.cantidad} </td> 
                                            <td> $ ${item.precioItem},00</td>
                                       </tr>`;
        }

$(".body-compra").append(tablaCarrito);

/*Cuando se presiona el boton "Confirmar compra" se vacia el carrito, se actualiza el localstorage y muestra un mensaje
de agradecimiento*/
$(".botonConfirmarCompra").click(()=>vaciarCarrito());

/*Al presionar el boton cerrar vuelve al html "productos.html", con el carrito vacio*/
$(".botonCerrar").click(()=>volverPaginaProductos());

/*Se utiliza nuevamente la api para obtener el alor del dolar y calcular el volor total de carrito en dolares*/
$.get(URLGET, function (precio , estado) {
        if(estado === "success"){
            precioDolar = precio[0].casa.compra;
            console.log(totalCarrito);
            precioDolar = totalCarrito / parseFloat(precioDolar) ;
            console.log(precioDolar);
            $(".shoppingCartTotalDolar").html(`U$S ${precioDolar.toFixed(2)}`);
            $(".shoppingCartTotalDolar").hide()
            $(".shoppingCartTotalDolar").fadeIn("slow")
        }
    });

function vaciarCarrito(){
        carrito = [];
        localStorage.setItem( "productos", JSON.stringify(carrito));
        localStorage.setItem( "total", JSON.stringify(0));
       
}

function volverPaginaProductos(){
        window.location.href = "productos.html";
}