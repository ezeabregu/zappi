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

const cart = document.querySelector('.cart_section');
const cartButton = document.querySelector('#carrito');
const categoriasList = document.querySelector('.categorias_card');
// catSelected devuelve un html collection
const catSelected = document.querySelectorAll('.card_categoria');
const lugarDeCategoria = document.querySelector('.cat_selected');
const textoCategoria = document.getElementById('texto_cat');

mostrarCarrito = (e) => {
    e.preventDefault();
    cart.classList.toggle("active_cart");
}

mostrarCategoria = (categoria) => {
    const { nombre, subtitulo, precio, imagen } = categoria;
    return ` <div class="card_cat">
                <img src="${imagen}" alt="${nombre}">
                <div class="card_cat_text">
                  <p class="title">${nombre}</p>
                  <p class="subtitle">${subtitulo}</p>
                  <p class="gradiente1">$${precio}</p>
                </div>    
                <button class="btn-text_recomendados">Agregar</button>
             </div>`;
};

mostrarCategorias = (categoria) => {
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
    else lugarDeCategoria.innerHTML="";
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
    if (!e.target.classList.contains("card_categoria")) return;
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

const init = () => {
    cartButton.addEventListener('click', mostrarCarrito);
    //window.addEventListener('DOMContentLoaded',mostrarCategorias);
    categoriasList.addEventListener('click', filtroCategoria);
}

init();
