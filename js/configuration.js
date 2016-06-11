var jsonLocal = [
  {
    "id": 1,
    "title": "AGOTADO CHALECO DOBLE FAZ BOGOTÁ HUMANA/CLARA ALCALDESA",
    "content": "Ni un solo ejemplar del chaleco doble faz “Bogotá Humana-Clara alcaldesa” quedaba esta mañana en las dependencias distritales. La prenda, marca Polo, desde luego, ha sido muy apetecida por los funcionarios de la Bogotá Humana por lo práctica que les resulta.",
    "image": "http://lorempixel.com/300/300"
  },
  {
    "id": 2,
    "title": "Falcao pide no ir sentado en el bus de la selección",
    "content": "Una novedad inesperada trajo el nuevo bus de la selección Colombia que será estrenado por el equipo de Pekerman la próxima semana cuando este se reúna para enfrentar a Perú en Barranquilla por la primera fecha de las eliminatorias a Rusia 2018.",
    "image": "http://lorempixel.com/300/300"
  },
  {
    "id": 3,
    "title": "El Papa y el Che fueron al mismo preescolar",
    "content": "Aimar, Bergoglio, Cáceres, D’Alessio, Enriquez, Fontanini, Guevara, Hammet…” No es la alineación de un equipo de fútbol argentino. Es la lista de párvulos encontrada en el archivo de la escuela Héroes del Mañana en San Isidro, Provincia de Buenos Aires, Argentina, que encontró hace menos de un mes Horacio Maidana, biógrafo argentino de Jorge Mario Bergoglio, al seguir los pequeños pasos de la infancia del Sumo Pontífice.",
    "image": "http://lorempixel.com/300/300"
  },
  {
    "id": 41,
    "title": "“NADA DE ECLIPSE, ATENTADO DE LA FAR DEJÓ SIN LUZ A LA LUNA”, DENUNCIA URIBE",
    "content": "Iracundo y desencajado, el expresidente Álvaro Uribe denunció hoy en rueda de prensa que la sombra que cubrió a la luna el pasado domingo en la noche fue un corte masivo de luz consecuencia de un atentado del frente “Compañera Laika” de las Farc.",
    "image": "http://lorempixel.com/300/300"
  }
];

var configuration = function () {
    $("#news").hide("slow");
    var cache = new Array();
    var objCache;
    this.loadNews = function (url) {
        if ($("#news").is(":visible")) {
            $("#news").hide("slow");
            $("#titulo").html("");
        } else {
            $("#news").show("slow");
            objCache = this.cacheSearch(url);
            if (objCache == null) {
                if (url == "local") {
                    objCache = { "url": url, "data": jsonLocal };
                    cache.push(objCache);
                } else {
                    $.getJSON(url, function (json) {
                        objCache = { "url": url, "data": json };
                        cache.push(objCache);
                    });
                }
                this.loadTitlesNews(objCache.data);
            } else {
                console.log("load by cache");
            }
        }
	};
	this.cacheSearch=function(url){
		var result=null;
		for(var i in cache){
			if(cache[i].url==url){
				result = cache[i];
				break;
			}
		}
		return result;
	};

	var clickItem = function (item, div) {
        return function () {
            loadContentNews(item, div);
        }
    }

	this.loadTitlesNews = function (news) {

	    var idNews = document.getElementById("news");

        for (var i=0; i<news.length;i++) {
            var noticia = news[i];
            var contenedorItem = document.createElement("div");
            contenedorItem.id = "contenedorItem" + noticia.id;
            contenedorItem.className = "col-xs-12";

            var item = document.createElement("div");
            item.className = "col-xs-12 item";
            item.onclick = clickItem(noticia, contenedorItem);

            var circulo = document.createElement("div");
            circulo.className = "col-xs-2 circulo";

            var divTitulo = document.createElement("div");
            divTitulo.className = "col-xs-10";

            var titulo = document.createElement("label");
            titulo.appendChild(document.createTextNode(noticia.title));

            divTitulo.appendChild(titulo);
            item.appendChild(circulo);
            item.appendChild(divTitulo);
            contenedorItem.appendChild(item);
            idNews.appendChild(contenedorItem);

        }
	}
	var loadContentNews = function (item, div) {
	    if ($("#" + div.id + " .content-news").is(":visible")) {
	    	$("#" + div.id + " .content-news").hide("slow");
	        $("#titulo").html("");
	    } else if($("#" + div.id + " .content-news").length==0){
	        var contentNews = document.createElement("div");
	        contentNews.className = "col-xs-12 content-news";

	        var contentImage = document.createElement("div");
	        contentImage.className = "col-md-4";

	        var contentText = document.createElement("div");
	        contentText.className = "col-md-8";

	        var image = document.createElement("img");
	        image.className = "img-responsive image";
	        image.src = item.image;

	        var title = document.createElement("label");
	        title.className = "col-xs-12";
	        title.appendChild(document.createTextNode(item.title));

	        var content = document.createElement("div");
	        content.className = "col-xs-12 text-justify";
	        content.appendChild(document.createTextNode(item.content));

	        contentImage.appendChild(image);
	        contentNews.appendChild(contentImage);
	        contentText.appendChild(title);
	        contentText.appendChild(content);
	        contentNews.appendChild(contentText);
	        div.appendChild(contentNews);
	        $("#" + div.id + " .content-news").show("slow");
	        $("#titulo").html(item.title);
	    }else{
	    	$("#titulo").html(item.title);
	    	$("#" + div.id + " .content-news").show("slow");
	    }
	    
	}
    this.loadContentNews = loadContentNews;
}
var configuracion = new configuration();
/**
* Cambie local en configuracion.loadNews("local") por la url del json de noticias
* Tener en cuenta Cross origin requests
*/
$("#loadNews").click(function(){
	configuracion.loadNews("local");
});

