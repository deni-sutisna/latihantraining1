     <script>
    (function ($, undefined) {
	'$:nomunge';  
	$.fn.serializeObject = function () {
		var obj = {};

		$.each(this.serializeArray(), function (i, o) {
			var n = o.name,
			v = o.value;

			obj[n] = obj[n] === undefined ? v
				 : $.isArray(obj[n]) ? obj[n].concat(v)
				 : [obj[n], v];
		});

		return obj;
	};

})(jQuery);

$(document).ready(function () {
	$("#tombolSimpan").on("click",simpanRegion);
	
})

 
function simpanRegion() {
	var product = $("#dataProduk").serializeObject();
	var url = "${pageContext.request.contextPath}/rs/tambahedithapus/simpanproduk";
	/*$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"contentType" : "application/json",
		"url" :url ,
		"data" : JSON.stringify(product)
	}).always(function (data) {
		alert(data.responseText);
	});*/
	if ($("#dataProduk")[0].checkValidity()) {
		var ajak = Ajax;
		ajak.post(url, product, pesanSukses, pesanError);
	} else {
		var tampil = Presentation;
		tampil.notify("#lokasiPesan", "Invalid form", tampil.level.warning)
	}
}

function pesanSukses(data){
	var tampil = Presentation;
	 tampil.notify("#lokasiPesan",data.pesanDariServer ,tampil.level.success) 
}

function pesanError(data){
	var validasi = Validations;
	var tampil = Presentation; 
	tampil.notify("#lokasiPesan",validasi.getMessages(data ),tampil.level.warning) 
}   
</script>
    <ul class="breadcrumb">
    <li><a href="${pageContext.request.contextPath}/rs/tesaction/jsp">Daftar Product </a></li>
    <li><a href="#">Tambah Product</a></li>
</ul>
<span class="row" id="lokasiPesan"></span>
    <form class="form-horizontal" method="post" id="dataProduk"
    >
      <fieldset>
        <legend>Tambah Product</legend>
        
        <div class="form-group">
          <label class="col-lg-4 control-label">Product Name:</label>
          <div class="col-lg-4">
            <input type="text" name="productName" id="productName" class="form-control form-control-inline"  />
          </div>
        </div> 
		<div class="form-group">
          <label class="col-lg-4 control-label">Supplier Id:</label>
          <div class="col-lg-4">
            <input  type="number" name="supplierId" id="supplierId" placeholder='isi dengan benar'  class="form-control form-control-inline" required   oninvalid="this.setCustomValidity('masukan identitas disini')"
    oninput="setCustomValidity('')" />
          </div>
        </div> 
		<div class="form-group">
          <label class="col-lg-4 control-label">Category Id:</label>
          <div class="col-lg-4">
            <input  type="number" name="categoryId" id="categoryId" class="form-control form-control-inline" />
          </div>
        </div> 
		<div class="form-group">
          <label class="col-lg-4 control-label">Quantity per Unit:</label>
          <div class="col-lg-4">
            <input  type="number" name="quantityperUnit" id="quantityperUnit" class="form-control form-control-inline" />
          </div>
        </div> 
		<div class="form-group">
          <label class="col-lg-4 control-label">Unit Price:</label>
          <div class="col-lg-4">
            <input  type="number" name="unitPrice" id="unitPrice" class="form-control form-control-inline" />
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-4 control-label">Units In Stock:</label>
          <div class="col-lg-4">
            <input  type="number" name="unitsInStock" id="unitsInStock" class="form-control form-control-inline" />
          </div>
        </div>	
        <div class="form-group">
          <label class="col-lg-4 control-label">Units On Order:</label>
          <div class="col-lg-4">
            <input  type="number" name="unitsOnOrder" id="unitsOnOrder" class="form-control form-control-inline" />
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-4 control-label">Reorder Level:</label>
          <div class="col-lg-4">
            <input  type="number" name="reorderLevel" id="reorderLevel" class="form-control form-control-inline" />
          </div>
        </div>  
        <div class="form-group">
          <label class="col-lg-4 control-label">Discontinued:</label>
          <div class="col-lg-4">
            <input  type="number" name="discontinued" id="discontinued" class="form-control form-control-inline" />
          </div>
        </div>   		
        <div class="row">
          <br />
        </div>
        <div class="form-group">
          <div class="col-lg-6 col-lg-offset-2">
          <button class="btn btn-primary" type="button"  id="tombolSimpan" >Simpan</button> 
          <button class="btn btn-default" type="reset">Reset</button></div>
        </div>
      </fieldset>
    </form> 
