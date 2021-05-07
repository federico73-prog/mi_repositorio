/*Declaracion de variables*/
let galeria = [];
let carrito = [];
let totalCarrito = 0;
let precioDolar = 0;

/*Link a api para calcular el valor total del carrito en dolares*/
let URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

/*Clases Producto e Item, con sus constructores y atributos*/
class Producto{
    constructor(idProducto, nombreProducto, precioProducto,categoria,color,img){
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.categoria = categoria;
        this.color = color;
        this.img = img;
    }  
} 

class Item{
    constructor(numeroItem,producto,precioItem,cantidad){
        this.numeroItem = numeroItem;
        this.producto = producto;
        this.precioItem = precioItem;
        this.cantidad = cantidad;
    }
}  

/*1) Cuando se ejecuta el html, lo primero que hace es llamar a la funcion "cargarGaleria()"
 para cargar los productos en el array "galeria".
 2) Luego se ejecuta la funcion "mostrarGaleria()" pasando el parametro "All" para que muestre todos los productos.
 3) Se llama al localstorage, y si hay productos cargados se incorporan al array "carrito", y se llama a la funcion
 addItemToShoppingCart para agregarlos al html*/
galeria = cargarGaleria(galeria);
mostrarGaleria(galeria,"All");
if(localStorage.getItem("productos")){
    console.log("hay productos cargados en el carrito");
    carrito = JSON.parse(localStorage.getItem("productos"));
    totalCarrito = parseInt(localStorage.getItem("precio"));
    for(item of carrito){
        addItemToShoppingCart(item);
    }
}
else{
    console.log("no hay nada cargado en el carrito");
}

$(".row__galeria").hide();
$(".row__galeria").fadeIn(1000);

/*La funcion "cargarGaleria()" agrega mediante push los productos al array galeria*/
function cargarGaleria(galeria){
    
    galeria.push(new Producto(0,"Short espiral",350,"Shorts","Multicolor", "img/foto1.jpg"));
    galeria.push(new Producto(1,"Remera de algodón",350,"Remeras", "Negro","img/foto2.jpg"));
    galeria.push(new Producto(2,"Buzo canguro",500,"Buzos","Gris", "img/foto3.jpg"));
    galeria.push(new Producto(3,"Holloweed",650,"Buzos","Negro", "img/foto4.jpg"));
    galeria.push(new Producto(4,"Pollera de algodón",200,"Polleras","Gris", "img/foto5.jpg"));
    galeria.push(new Producto(5,"Buzo de algodón",500,"Buzos","Negro", "img/foto6.jpg"));

    return galeria;
}

/*La funcion mostrarGaleria() muestra los productos segun la categoria que se pase por parametro. En la seccion "productos"
del nav (en html), se pueden seleccionar productos por categoria (dropdown).
Se incluyen en el html los botones "Agregar", para que el usuario pueda sumar productos al carrito*/
function mostrarGaleria(galeria, categoria){
    let categ = categoria;

    if(categ=="All"){
        $(".row__galeria").empty();
        $(".h2__container__nuestroCatalogo").html("Nuestro Catalogo");
        for(let producto of galeria){
            let nuevoProducto=`
            <div class="col-md-4 galeria__div">
                        <div class="portfolio-container">
                            <a href="" data-toggle="modal" data-target="#exampleModal1-1"><img class="galeria__img" portf
                                    src="${producto.img}"></a>
                            <div class="div__portfolio-details" portfolio-details>
                                <h3 class="galeria__h3 nombreP"><b>${producto.nombreProducto}</b></h3>
                                <h4 class="galeria__h4 precioP">Precio: $ ${producto.precioProducto},00</h4>
                                <h4 class="galeria__h4 colorP">Colores: ${producto.color}</h4>
                                <button type="button" class="btn btn-dark mt-2 botonComprar${producto.idProducto}">Agregar</button>
                            </div>
                        </div>
            </div>`;
            $(".row__galeria").append(nuevoProducto);
            $(`.botonComprar${producto.idProducto}`).click(()=>cargarCarrito(producto));
        }
    }
    else{
        let galeriaAux = [];
        galeriaAux = cargarGaleriaAux(galeria,galeriaAux,categoria);
        $(".row__galeria").empty();
        $(".h2__container__nuestroCatalogo").html(categoria);
        
        for(producto of galeriaAux){
            let nuevoProducto=`
            <div class="col-md-4 galeria__div">
                <div class="portfolio-container">
                    <a href="" data-toggle="modal" data-target="#exampleModal1-1"><img class="galeria__img" portf
                                    src="${producto.img}"></a>
                    <div class="div__portfolio-details" portfolio-details>
                        <h3 class="galeria__h3 ">${producto.nombreProducto}</h3>
                        <h3 class="galeria__h3 ">$ ${producto.precioProducto},00</h3>
                        <h3 class="galeria__h3 ">${producto.color}</h3>
                        <button type="button" class="btn btn-dark mt-2 botonComprar${producto.idProducto}">Agregar</button>
                    </div>
                </div>
            </div>`;
            $(".row__galeria").append(nuevoProducto);
            $(`.botonComprar${producto.idProducto}`).click(()=>cargarCarrito(producto));
        }
    }
}

/*La funcion "cargarGaleriaAux()", se utiliza para crear un nuevo array momentaneo "galeriaAux", 
para no pisar el array "galeria" original.*/ 
function cargarGaleriaAux(galeria,galeriaAux,categoria){
    for(producto of galeria){
        if(producto.categoria==categoria){
            galeriaAux.push(producto);
        }
    }
    return galeriaAux;
}

/*La funcion cargarCarrito() crea un nuevo item en el array "carrito" con el producto seleccionado por el usuario. Si 
un producto ya se encuentra en el carrito solo se incrementa la cantidad del item.
Se utiliza la libreria Sweet Alert 2 para mostrar un mensaje cada vez que se agrega un producto */
function cargarCarrito(producto){
    //console.log(carrito);
    Swal.fire({
        title: `Agregaste "${producto.nombreProducto}" al carrito`,
        text: `Su valor es: $ ${producto.precioProducto},00`,
        toast: true,
        position: 'bottom-end',
        timer: 4000,
        timerProgressBar: true,
        background: "#56df5d",
        color: "white",
        icon: 'success'
    });
    let existeEnCarrito = false;
    for(let item of carrito){
        if(item.producto.idProducto === producto.idProducto){
            existeEnCarrito = true;
            break;
        }
        else{
            existeEnCarrito = false;
        }
    }
    if(existeEnCarrito == true){

        document.getElementById(`cartQuantity${producto.idProducto}`).value =  parseInt((document.getElementById(`cartQuantity${producto.idProducto}`).value)) + 1;
        actualizarPrecioCarrito(carrito);
    }
    else{
        const item = new Item(carrito.length,producto,producto.precioProducto,1);
        carrito.push(item);
        addItemToShoppingCart(item);
    }
}

/*La funcion addItemToShoppingCart() muestra en html el carrito con el producto seleccionado.
  Se agrega el boton delete para eliminar productos del carrito, y los botones para incrementar o aumentar la cantidad*/
function addItemToShoppingCart(item){
    const nuevoItem = `
    <div id="itemFila${item.producto.idProducto}" class="row shoppingCartItem${item.producto.idProducto}">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3 ">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0 carrito__h6">${item.producto.nombreProducto}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice carrito__h6">$ ${item.producto.precioProducto},00</p>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input id="cartQuantity${item.producto.idProducto}" class="shopping-cart-quantity-input shoppingCartItemQuantity botonCantidad${item.producto.idProducto} " type="number" id="quantity" name="quantity" min="1" 
                value=${item.cantidad}>
                <button id = "botonEliminar" class="btn btn-danger buttonDelete${item.producto.idProducto}" type="button">X</button>
            </div>
        </div>
    </div>`;
    parseInt(item.cantidad);
   
    $(".shoppingCartItemsContainer").append(nuevoItem);
    actualizarPrecioCarrito();
    

    $(`.buttonDelete${item.producto.idProducto}`).click(()=>{
        Swal.fire({
            title: `Eliminaste ${item.cantidad} "${item.producto.nombreProducto}" del carrito`,
            text: `Valor: $ ${item.precioItem},00`,
            toast: true,
            position: 'bottom-end',
            timer: 4000,
            timerProgressBar: true,
            background: "#fa4b1f",
            icon: 'error'
        });
        $(`.buttonDelete${item.producto.idProducto}`).parent().parent().parent().remove();
        eliminarItemCarrito(item);
        actualizarPrecioCarritoDlt(item);
    });

    $(`.botonCantidad${item.producto.idProducto}`).change(()=>{
        actualizarPrecioCarrito();
    });
}


/*La funcion eliminarItemCarrito() elimina del array "carrito" un item. Tambien actualiza el array en el localstorage*/ 
function eliminarItemCarrito(item){
    carrito.splice(item.numeroItem,1);
    let i = 0;
    for(item of carrito){
        carrito[i].numeroItem = i;
        i++;
    }

    localStorage.setItem( "productos", JSON.stringify(carrito));
}

/*La funcion actualizarPrecioCarritoDlt() actualiza el procio total del carrito cuando se elimina un producto 
y actualiza el localstorage*/
function actualizarPrecioCarritoDlt(item){
    
    totalCarrito = totalCarrito - item.precioItem;
    $(".shoppingCartTotal").html(`$ ${totalCarrito.toFixed(2)}`);
    $(".shoppingCartTotal").hide()
    $(".shoppingCartTotal").fadeIn("slow")
    localStorage.setItem( "total", JSON.stringify(totalCarrito));
}


/*La funcion actualizarPrecioCarrito() actualiza el precio total del carrito cuando se agrega un producto o se 
modifica la cantidad.*/
function actualizarPrecioCarrito(){
    totalCarrito = 0;
    carrito = actualizarCantidades();

    for(const item of carrito){
        let nuevoPrecioItem = calcularPrecioItem(item);
        item.precioItem = nuevoPrecioItem;
        //console.log(nuevoPrecioItem);
        totalCarrito = totalCarrito + nuevoPrecioItem;
    }
    
    $(".shoppingCartTotal").html(`$ ${totalCarrito.toFixed(2)}`);
    $(".shoppingCartTotal").hide()
    $(".shoppingCartTotal").fadeIn("slow")
        
    localStorage.setItem( "productos", JSON.stringify(carrito));
    localStorage.setItem( "total", JSON.stringify(totalCarrito));
}

/*La funcion actualizarCantidades(), utiliza el metodo "querySelectorAll" para obtener las cantidades
de los item en tiempo real y actualizarlas si hubo alguna modificacion*/
function actualizarCantidades(){
    const itemsCant = document.querySelectorAll(`.shoppingCartItemQuantity`);
    let i=0;
    for(itemCant of itemsCant){
        let cantidad = parseInt(itemCant.value);
        carrito[i].cantidad = cantidad;
        i++;
    }
    return carrito;
}

/* La funcion calcularPrecioItem(), calcula el precio del item multiplicando el precio del producto por la cantidad*/
function calcularPrecioItem(item){
    return item.producto.precioProducto * item.cantidad;
}

/*Cuando el usuario presiona el boton "Comprar", muestra un modal que contiene el detalle del carrito. Si no hay items
en el mismo muestra un ensaje de alerta*/
function cargarModal(){
    let total = 0;
    actualizarPrecioCarrito();
    $(".modal-body_js").empty();
    if(carrito.length > 0)
        {
        $(".modal-title").html("Detalle de carrito:");
        $(".botonProcesarCompra").show();
        let tablaCarrito = "<table class= tabla__modal >";
        tablaCarrito =tablaCarrito+ `<thead><tr><th>Numero</th> <th>Producto</th><th> Precio </th><th> Cantidad</th><th> Precio final</th></tr></thead>`;
        for(item of carrito){
            tablaCarrito = tablaCarrito + `<tr> 
                                            <td> ${item.numeroItem+1} </td> 
                                            <td> ${item.producto.nombreProducto} </td> 
                                            <td> $ ${item.producto.precioProducto},00 </td> 
                                            <td> ${item.cantidad} </td> 
                                            <td> $ ${item.precioItem},00</td>
                                       </tr>`;
            total = total + item.precioItem;
        }

        $(".modal-body_js").append(tablaCarrito);
        $(".h3__total").html("Total carrito: $ "+total+",00");
        $(".h3__total").show();
        
    }
    else{
        $(".modal-title").html("No hay productos en el carrito.");
        $(".h3__total").hide();
        $(".botonProcesarCompra").hide();   
       
    }
}

/*Cuando se presiona el boton "Procesar compra" (dentro del modal), se referencia al html "compra.html"
que muestra la descripcion detallada del carrito y la posibilidad de procesar la compra*/
function mostrarCompra(){
    localStorage.setItem( "productos", JSON.stringify(carrito));
    window.location.href = "compra.html";
}

/*EVENTOS BOTONES*/

/*Cuando se presiona el boton "Valor dolar", mediante la api mencionada anteriormente se obtiene la cotizacion del dolar
y se calcula el valor del total del carrito en esa moneda*/
$(".dolarButton").click(() => {
    $.get(URLGET, function (precio , estado) {
        if(estado === "success"){
            precioDolar = precio[0].casa.compra;
            console.log(precioDolar);
            precioDolar = totalCarrito / parseFloat(precioDolar) ;

            $(".shoppingCartTotalDolar").html(`U$S ${precioDolar.toFixed(2)}`);
            $(".shoppingCartTotalDolar").hide()
            $(".shoppingCartTotalDolar").fadeIn("slow")
        }
    });
    
});

$(".btn_Shorts").click(()=>mostrarGaleria(galeria,"Shorts"));
$(".btn_Remeras").click(()=>mostrarGaleria(galeria,"Remeras"));
$(".btn_Polleras").click(()=>mostrarGaleria(galeria,"Polleras"));
$(".btn_Buzos").click(()=>mostrarGaleria(galeria,"Buzos"));
$(".btn_All").click(()=>mostrarGaleria(galeria,"All"));


$(".botonCompraFinal").click(()=>cargarModal());
$(".botonProcesarCompra").click(()=>mostrarCompra());
