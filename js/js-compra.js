carrito = JSON.parse(localStorage.getItem("productos"));
totalCarrito = parseInt(localStorage.getItem("total"));
precioDolar = 0;
console.log(totalCarrito);


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

$(".botonConfirmarCompra").click(()=>vaciarCarrito());
$(".botonCerrar").click(()=>volverPaginaProductos());

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
        window.location.href = "index.html";
}