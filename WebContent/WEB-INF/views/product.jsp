<span class="row" id="lokasiPesan"></span>
<div class="panel  panel-primary ">
    <div class="panel-heading panel-title">Parameter Pencarian</div>
    <div class="panel-body">
        <div class="row">
            <div class=" form-group col-xs-6 text-center">
               Nama Produk: 
                <input type="text"   id="namaBarang"    size="10"  class="date-picker  form-control-inline  "  /> 
            </div>
        </div>
        <div class="row form-group col-xs-7 text-center">
            <button id="btncari" class="btn btn-primary">Cari</button>
            <button id="btnreset" type="reset" class="btn btn-primary">Reset</button>
        </div>
    </div>
</div>
<br/>
<hr/>
<div class="row">
<a href="${pageContext.request.contextPath}/rs/tambahedithapus/addproduct">Tambah Data</a>
    <table id="padtable" class="table table-striped table-bordered table-condensed table-hover" >
        <thead>
            <tr>
                <th>No</th>
                <th>productName</th>
                <th>supplierId</th> 
                 <th>categoryId</th> 
                  <th>quantityperUnit</th> 
                  <th>unitPrice</th> 
                <th>Hapus</th>
                <th>Ubah</th> 
            </tr>
        </thead>
        <tbody id='produkBody'  >
        </tbody>
    </table> 
</div>
<script>
 
$(document).ready(function () {
	gridswift();
	$("#btncari").on("click", gridswift);
})
function gridswift() {
	var ajax = Ajax;
	var parameters = {
		namaProduk : $("#namaBarang").val()
	};
	ajax.get("${pageContext.request.contextPath}/rs/beranda/listallproduk", parameters, customView)

}
function customView(data) {
	var html = "";
	var i = 1;
	$.each(data, function (key, value) {
		html += "<tr>";
		html += "<td>";
		html += i++;
		html += "</td>";

		html += "<td>";
		html += value.productName;
		html += "</td>";
		html += "<td>";
		html += value.supplierId;
		html += "</td>";
		html += "<td>";
		html += value.categoryId;
		html += "</td>";
		html += "<td>";
		html += value.quantityperUnit;
		html += "</td>";
		html += "<td>";
		html += value.unitPrice;
		html += "</td>";
		html += "<td>";
		html += "<a onclick='delProduk(" + value.productId + ")' href='#'>Hapus</a>";
		html += "</td>";
		html += "<td>";
		html += "<a href='${pageContext.request.contextPath}/rs/tambahedithapus/editproduct/" + value.productId + "'>Ubah</a>";
		html += "</td>";
		html += "</tr>";
	});

	$("#produkBody").html(html);

}
function delProduk(productId) {
	var r = confirm("Yakin akan menghapus data ini !");
	if (r == true) {
	var param = {
		productId : productId 
	}
	console.log(param)
	var url = "${pageContext.request.contextPath}/rs/tambahedithapus/hapusproduk";
		var ajak = Ajax;
		ajak.post(url, param, pesanSukses, pesanError);
	}
}

function pesanSukses(data){
    gridswift();
	var tampil = Presentation;
	 tampil.notify("#lokasiPesan",data.pesanDariServer ,tampil.level.success) 
}

function pesanError(data){
	var validasi = Validations;
	var tampil = Presentation; 
	tampil.notify("#lokasiPesan",validasi.getMessages(data ),tampil.level.warning) 
} 


</script>