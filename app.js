/*
Buenas, ¿Cómo están? 🎓

En Nucba consideramos que era una buena idea tener un segundo modelo de negocio y por eso entre 
todo el equipo decidimos que la mejor idea era abrir una pizzería.

Como queremos que todos en Nucba sean parte de este proyecto, hemos decidido que ustedes, los
alumnos, podían formar parte de la experiencia y realizar el maquetado de la Landing Page y 
desarrollar las funcionalidades de este nuevo negocio.🙌

Para esta entrega, el equipo de diseño de Nucba les preparo las pantallas que queremos para 
la página de este emprendimiento, y será tarea de ustedes y su equipo replicar el diseño y 
entregar como producto final la landing page terminada y funcional.

Les dejamos el link al figma del proyecto del cual podrán sacar los assets necesarios para 
realizar este trabajo.
Al ser un trabajo grupal, el plazo que tendrán para realizarlo es de dos semanas, tiempo 
suficiente para que puedan dividirse las tareas y definan como organizarse y ejecutar este desafío.


Además, queremos mencionarles que confiamos en ustedes para sacar adelante este proyecto y 
que disfruten esta nueva experiencia de trabajar en grupo, ya que esta es solo la primera
experiencia grupal que tendrán en este rubro y es fundamental que aprendan a acoplarse y organizarse
en ese aspecto ya desde esta etapa temprana de su desarrollo como developers.

Les dejamos el link a una documentación copada en la plataforma de Nucba acerca de trabajo en 
equipo 👉 Documentación Teamwork.

¿Nos vemos en React? 😈

Los requisitos son:
👉 Realizar el maquetado de la página
👉 Renderizar HTML desde JS (Crear y renderizar los productos en base a un array de productos).
👉 Deberán utilizar localStorage, para persistir datos en el sitio.
👉 Los productos deben poder agregarse al carrito de compras y se deben poder manipular las 
cantidades del producto, borrar productos y actualizar dinámicamente el total de la compra.
👉 Deberá poderse confirmar la compra( mediante un alert o, si se animan, haciendo un modal) 
y luego de confirmarse limpiar el carrito de compras.
👉 Los filtros de productos deben ser funcionales (Renderizar solo los productos de esa categoría
determinada, mostrar cual es el filtro activo).

👉 Una vez que esté finalizado, pueden subirlo a github y compartirlo por discord para mostrarlo
al resto de la comunidad. 

Dentro del repositorio deben crear un readme en el cual figure el nombre y apellido de los que 
participaron en el desarrollo del mismo.

👉 Si tienen dudas, vayan directamente a consultar en el servidor de Discord (recordá las reglas
para poder hacer consultas o participar del canal privado).*

#HappyCoding 🚀.
*/

const cartSection = document.querySelector('.cart_section');
const cartButton = document.querySelector('#carrito');
const categoriasList = document.querySelector('.categorias_card');
// catSelected devuelve un html collection
const catSelected = document.querySelectorAll('.card_categoria');
const lugarDeCategoria = document.querySelector('.cat_selected');
const textoCategoria = document.getElementById('texto_cat');
const listaCarrito = document.getElementById('lista');
const vaciarCarrito = document.getElementById('vaciar');
const comprarCarrito = document.getElementById('comprar');
const subtotalCompra = document.getElementById('subtotal');
const envioCompra = document.getElementById('envio');
const totalCompra = document.getElementById('total');
const menos = document.querySelector('.less');
const mas = document.querySelector('.more');
const modal = document.querySelector('.modal');

console.log(modal);

let carrito = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
}

const mostrarCarrito = (e) => {
    e.preventDefault();
    cartSection.classList.toggle("active_cart");
    subtotalCarrito();
    mostrarTotal();
    mostrarCarritoLista();
}

const mostrarCategoria = (categoria) => {
    const { id, nombre, subtitulo, precio, imagen } = categoria;
    return ` <div class="card_cat">
                <img src="${imagen}" alt="${nombre}">
                <div class="card_cat_text">
                  <p class="title">${nombre}</p>
                  <p class="subtitle">${subtitulo}</p>
                  <p class="gradiente1">$${precio}</p>
                </div>    
                <button class="btn-text_recomendados btn_agregar" data-id='${id}' data-nombre='${nombre}' data-subtitulo='${subtitulo}' data-precio='${precio}' data-imagen='${imagen}'>Agregar</button>
             </div>`;
};

const mostrarCategorias = (categoria) => {
    textoCategoria.innerHTML=categoria;
    if(categoria === 'populares')
    {
      lugarDeCategoria.innerHTML = categoriaPopulares.map(mostrarCategoria).join("");
    }
    else if(categoria === 'pizza')
    {
      lugarDeCategoria.innerHTML = categoriaPizza.map(mostrarCategoria).join("");
    }
    else if(categoria === 'burger')
    {
      lugarDeCategoria.innerHTML = categoriaBurger.map(mostrarCategoria).join("");
    }
    else if(categoria === 'milkshake')
    {
      lugarDeCategoria.innerHTML = categoriaMilshake.map(mostrarCategoria).join("");
    }
    else if(categoria === 'mex')
    {
      lugarDeCategoria.innerHTML = categoriaMex.map(mostrarCategoria).join("");
    }
    else if(categoria === 'fries')
    {
      lugarDeCategoria.innerHTML = categoriaFries.map(mostrarCategoria).join("");
    }
    else if(categoria === 'wrap')
    {
      lugarDeCategoria.innerHTML = categoriaWrap.map(mostrarCategoria).join("");
    }
}

const botonCategoriaActivo = (selectedCategory) => {
    const categories = [...catSelected];
    categories.forEach((catSelectedBtn) => {
      if (catSelectedBtn.dataset.food !== selectedCategory) {
        catSelectedBtn.classList.remove("active");
        return;
      }
      catSelectedBtn.classList.add("active");
    });
};
  
const mostrarResultadoCategoria = (e) => {
    const selectedCategory = e.target.dataset.food;
    botonCategoriaActivo(selectedCategory);
    // changeShowMoreBtnState(selectedCategory);
};

const filtroCategoria = (e) => {
    if (!e.target.classList.contains('card_categoria')) return;
    mostrarResultadoCategoria(e);
    console.log(e.target.dataset.food);
    if (!e.target.dataset.food) {
       lugarDeCategoria.innerHTML = "";
       //mostrarCategorias();
    } 
    else {
       mostrarCategorias(e.target.dataset.food);
    }
};

const cerrarAlScroll = () => {
  if (!cartSection.classList.contains('active_cart')) {
    return;
  }
  cartSection.classList.remove('active_cart');
};

/*******Carrito de compras**********/

const mostrarCarritoElemento = (producto) => {
  const { imagen, nombre, subtitulo, precio, cantidad} = producto;
  return ` <div class="card_product">
              <img src="${imagen}" alt="">
              <div class="card_text_cart">
                <h5>${nombre}</h5>
                <h6>${subtitulo}</h6>
                <h4 class="gradiente">$${precio}</h4>
              </div>
              <div class="card_buttons">    
                <button class="btn-text_recomendados less" data-nombre='${nombre}'>-</button>
                <label id="cantidad">${cantidad}</label>
                <button class="btn-text_recomendados more" data-nombre='${nombre}'>+</button>
              </div>   
           </div>`;
};

const mostrarCarritoLista = () => {
  if (!carrito.length) {
    listaCarrito.innerHTML = `<h3 class="mensajeCarrito">Aún no hay productos</h3>`;
    return;
  }
  listaCarrito.innerHTML = carrito.map(mostrarCarritoElemento).join("");
};

const crearDatosDeProducto = (id,nombre,subtitulo,precio,imagen) => {
    return {id,nombre,subtitulo,precio,imagen};
};

const crearProductoEnCarrito = (producto) => {
  carrito = [...carrito, {...producto, cantidad: 1}];
};

const existeProductoEnCarrito = (producto) => {
  return carrito.find((item) => item.nombre === producto.nombre);
};

const sumarUnidadAlProducto = (producto) => {
  carrito = carrito.map((carritoProducto) => {
    return carritoProducto.nombre === producto.nombre ?
    { ...carritoProducto, cantidad: carritoProducto.cantidad + 1}
    : carritoProducto;
  });
};

const subtotalCarrito = () => {
  return carrito.reduce((acc,cur) => acc + Number(cur.precio)*cur.cantidad,0);
};

const envio = () => {
  if(subtotalCarrito() >= 5000 || !carrito.length) return 0;
  else{
    return 1250;
  }
}

const mostrarTotal = () => {
  subtotalCompra.innerHTML = `$${subtotalCarrito().toFixed(2)}`;
  envioCompra.innerHTML = `$${envio()}`;
  totalCompra.innerHTML = `$${(subtotalCarrito()+envio()).toFixed(2)}`;
};

const mostrarModal = (msg) => {
  modal.classList.add("modal-activo");
  modal.textContent = msg;
  setTimeout(() => {
    modal.classList.remove("modal-activo");
  }, 1500);
};

const agregarProduto = (e) => {
  if (!e.target.classList.contains('btn_agregar')) return;
  const { id, nombre, subtitulo, precio, imagen } = e.target.dataset;
  const producto = crearDatosDeProducto(id, nombre, subtitulo, precio, imagen);
  if(existeProductoEnCarrito(producto)){
    sumarUnidadAlProducto(producto);
    mostrarModal("Se agrego una unidad del producto al carrito!"); 
  }else{
    crearProductoEnCarrito(producto);
    mostrarModal("El producto se ha agregado al carrito!");
  }
  estadoCarrito(); 
};

const borrarProductoDelCarrito = (existeProducto) => {
  carrito = carrito.filter((producto) => producto.nombre !== existeProducto.nombre);
  estadoCarrito();
};

const restarUnidadProducto = (existeProducto) => {
  carrito = carrito.map((producto) => {
      return producto.nombre === existeProducto.nombre ? 
      {...producto, cantidad: Number(producto.cantidad)-1}
      : producto;
  });
};

const botonDecrementarProducto = (nombre) => {
  const existeProductoEnCarrito = carrito.find((item) => item.nombre === nombre);

  if (existeProductoEnCarrito.cantidad === 1) {
    if (window.confirm("Desea eliminar el producto del carrito")) {
      // borrar producto
      borrarProductoDelCarrito(existeProductoEnCarrito);
    }
    return;
  }
  // Restar uno al producto existente
  restarUnidadProducto(existeProductoEnCarrito);
};

const botonIncrementarProducto = (nombre) => {
  const existeProductoEnCarrito = carrito.find((item) => item.nombre === nombre);
  sumarUnidadAlProducto(existeProductoEnCarrito);
};

const cantidadEnCarrito = (e) => {
  if (e.target.classList.contains("less")) {
    botonDecrementarProducto(e.target.dataset.nombre);
  } else if (e.target.classList.contains("more")) {
    botonIncrementarProducto(e.target.dataset.nombre);
  }
  estadoCarrito();
};

const vaciarCarritoDeCompras = () => {
  var opcion = window.confirm("¿Está seguro que desea vaciar el carrito?");
  if (opcion === true) {
    carrito = [];
    estadoCarrito();
    alert('Carrito vaciado.');
  } else {
    alert('Cancelado exitosamente.');
  }
  estadoCarrito();
};

const finalizarCompra = () => {
  if(!carrito.length) return;
  var respuesta = window.confirm('¿Desea finaliza la compra y abonar?');
  if (respuesta === true) {
    alert('Gracias por su compra!');
    carrito = [];
    estadoCarrito();
  } else {
    alert('Continue comprando...')
  }
  estadoCarrito();
}

const estadoCarrito = () => {
  saveLocalStorage(carrito);
  mostrarCarritoLista(carrito);
  mostrarTotal(carrito);
  //disableBtn(buyBtn);
  //disableBtn(deleteBtn);
};

/**********************************/

const init = () => {
    cartButton.addEventListener('click', mostrarCarrito);
    document.addEventListener('DOMContentLoaded', mostrarCarritoLista);
    categoriasList.addEventListener('click', filtroCategoria);
    lugarDeCategoria.addEventListener('click', agregarProduto);
    vaciarCarrito.addEventListener('click', vaciarCarritoDeCompras);
    window.addEventListener('scroll', cerrarAlScroll);
    comprarCarrito.addEventListener('click', finalizarCompra);
    listaCarrito.addEventListener('click', cantidadEnCarrito);
};

init();
