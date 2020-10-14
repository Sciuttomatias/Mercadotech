			// - Sugar Syntax | Sintaxis Azucarada -
			//function cargarCatalogo(){
			// 	//Aca va un codigo loco
			// 	alert('Hola soy la funcion "cargarCatalogo()"')
			//}

			//const easyDB = require("easydb-io")


			// const db = easyDB({
			// 	database: '07144711-2d97-44e3-a525-2c467f179f5a',
			// 	token: '53e7b35c-268a-443f-8fba-365d91bf2d60'
			//   })


			const cargarCatalogo = async function(){

				try {
					const response = await fetch("https://api.npoint.io/15a01232d62ae76273b4")
					const datos = await response.json()

					const productos = datos.map( item => {

						const articulo = document.querySelector('article').cloneNode(true)

						articulo.querySelector("img").src = item.Imagen
						articulo.querySelector("h4 a").innerText = `${item.Marca} - ${item.Nombre}` //Old School: producto.Marca + " - " + producto.Nombre
						articulo.querySelector("h4 span").innerText = `ARS ${item.Precio}`
						articulo.querySelector("p").innerText = item.Stock + " unid."

						articulo.classList.remove('d-none')
						articulo.setAttribute('data-price', item.Precio)

						return articulo
					})

					//////////////////////Botones de filtrado//////////////////////////////////////

					let padre = document.querySelector("#productos-destacados")
					
					const catalogo = productos
					const filtados_menor_500 = productos.filter( producto => producto.getAttribute("data-price") < 500 )
					const filtados_mayor_500_menor_1000 = productos.filter( producto => producto.getAttribute("data-price") > 500 && producto.getAttribute("data-price") <= 1000 )
					const filtados_mayor_1000_menor_1500 = productos.filter( producto => producto.getAttribute("data-price") > 1000 && producto.getAttribute("data-price") <= 1500 )
					const filtados_mayor_1500_menor_2000 = productos.filter( producto => producto.getAttribute("data-price") > 1500 && producto.getAttribute("data-price") <= 2000 )

					function limpiarCatalogo(){
						padre.innerHTML = ""
					}
			
					document.querySelector("#catalogo").onclick = () => {
						catalogo.forEach(producto => padre.appendChild(producto))
						}
					document.querySelector("#filtrar-menores-500").onclick = () => {
						limpiarCatalogo()
						filtados_menor_500.forEach(producto => padre.appendChild(producto))
						}
					document.querySelector("#filtrar-menores-1000").onclick = () => {
						limpiarCatalogo()
						filtados_mayor_500_menor_1000.forEach(producto => padre.appendChild(producto))
						}
					document.querySelector("#filtrar-menores-1500").onclick = () => {
						limpiarCatalogo()
						filtados_mayor_1000_menor_1500.forEach(producto => padre.appendChild(producto))
						}
					document.querySelector("#filtrar-menores-2000").onclick = () => {
						limpiarCatalogo()
						filtados_mayor_1500_menor_2000.forEach(producto => padre.appendChild(producto))
						}

				} 
				
				catch(error){
					alert("Ahhhhh... no tengo productos!!!!")
				}
			}

			const crearProducto = async () => {

				const formularioProductoNuevoHTML = document.querySelector('#agregar-producto')


				document.querySelector("#btn-mandar-nuevo-producto").onclick = async function(){

					const formDataProductoNuevo = new FormData(formularioProductoNuevoHTML)
					
					const formJavascript = Object.fromEntries(formDataProductoNuevo)

					//////////////////////////Agregar nuevo producto al front/////////////////////


					const articulo = document.querySelector('article').cloneNode(true)

					articulo.querySelector("img").src = formJavascript.imagen
					articulo.querySelector("h4 a").innerText = `${formJavascript.marca} - ${formJavascript.nombre}` //Old School: producto.Marca + " - " + producto.Nombre
					articulo.querySelector("h4 span").innerText = `ARS ${formJavascript.precio}`
					articulo.querySelector("p").innerText = formJavascript.stock + " unid."

					articulo.classList.remove('d-none')
					articulo.setAttribute('data-price', formJavascript.precio)

					let padre = document.querySelector("#productos-destacados")
					padre.prepend(articulo)

					//////////////////Configuracion para metodo fetch////////////////////

					const agregarProductoConfig = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formJavascript)}

						await fetch("http://localhost:2000/agregar", agregarProductoConfig);

				}
			

			}
				
				

					// const configs = {
					// 	method : "POST",
					// 	headers : {
					// 		"Content-Type" : "application/json",
					// 		"token" : "53e7b35c-268a-443f-8fba-365d91bf2d60"
					// 	},
					// 	body : {
					// 		"key" : "22",
					// 		"value" : JSON.stringify(formJavascript)
					// 	}
					// }


					// db.put('myKey', formJavascript, err => console.log(err))


					/////////////////Mandando el producto nuevo a EASYDB/////////////
	
					// await fetch("https://app.easydb.io/database/07144711-2d97-44e3-a525-2c467f179f5a", configs)

					/////////////////////////////////////////////////////////////////////////////////

				

			

			document.querySelector("#agregar-producto").onclick = crearProducto

			window.onload = cargarCatalogo
			
			