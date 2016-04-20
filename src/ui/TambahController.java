package ui;

import java.io.IOException;

import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import suzuki.swift.validation.Validations;
import suzuki.swift.validation.ViolationException;
import suzuki.swift.web.ViolationExceptionMapper;
import model.Pesan;
import model.Product; 
 
@Path("/tambahedithapus")
public class TambahController {

	private EntityManager em;

	private static EntityManager getEntityManager() throws NamingException {
		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("contoh1");
		return emf.createEntityManager();
	}

	@GET
	@Path("/addproduct")
	public void addProductJSP(@Context HttpServletResponse response,
			@Context HttpServletRequest request, @Context UriInfo uri)
			throws ServletException, IOException {
		request.setAttribute("basePath", uri.getBaseUri());
		request.getRequestDispatcher("/WEB-INF/views/add.jsp").forward(request,
				response);

	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/simpanproduk")
	public Response postDataProduct(Product msg) throws Exception {
		ViolationExceptionMapper vem = new ViolationExceptionMapper();
		if (Validations.isRequired(msg.getProductName()) ) {
			em = getEntityManager();
			em.getTransaction().begin();
			Product produk = msg;
			em.persist(produk);
			em.getTransaction().commit();
			em.close(); 
			Pesan pesan = new Pesan();
			pesan.setPesanDariServer("Data Tersimpan !");
			return Response.ok( ).entity(pesan).build();
		} else {
			return	vem.toResponse( new ViolationException("name can not be empty.") );
		} 
	}
	
	@GET
	@Path("/editproduct/{id}")
	public void editProductJSP(@Context HttpServletResponse response,
			@Context HttpServletRequest request, @Context UriInfo uri,@PathParam("id") Long id)
			throws ServletException, IOException, NamingException {
		em = getEntityManager();
		Product produk = em.find(Product.class, id);
		request.setAttribute("basePath", uri.getBaseUri());
		request.setAttribute("produk", produk);
		request.getRequestDispatcher("/WEB-INF/views/edit.jsp").forward(request,
				response);
		em.close();

	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/updateproduk")
	public Response updateDataProduct(Product msg) throws Exception {
		ViolationExceptionMapper vem = new ViolationExceptionMapper();
		if (Validations.isRequired(msg.getProductName()) && Validations.isRequired(msg.getProductId()) ) {
			em = getEntityManager();
			em.getTransaction().begin();
			Product produk = em.find(Product.class, msg.getProductId());
			produk.setCategoryId(msg.getCategoryId());
			produk.setDiscontinued(msg.getDiscontinued()); 
			produk.setProductName(msg.getProductName());
			/*produk.setQuantityperUnit(msg.getQuantityperUnit());
			produk.setReorderLevel(msg.getReorderLevel());
			produk.setSupplierId(msg.getSupplierId());
			produk.setUnitPrice(msg.getUnitPrice());
			produk.setUnitsInStock(msg.getUnitsInStock());
			produk.setUnitsOnOrder(msg.getUnitsOnOrder());*/
			em.persist(produk);
			em.getTransaction().commit();
			em.close(); 
			Pesan pesan = new Pesan();
			pesan.setPesanDariServer("Data Tersimpan !");
			return Response.ok( ).entity(pesan).build();
		} else {
			return	vem.toResponse( new ViolationException("name can not be empty.") );
		} 
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/hapusproduk")
	public Response delProduk(Product msg) throws Exception {
		em = getEntityManager();
		Query query = em
				.createQuery("DELETE FROM Product a  WHERE a.productId = :id"); 
		query.setParameter("id", msg.getProductId());  
		em.getTransaction().begin(); 
		int hasil = query.executeUpdate();  
		em.getTransaction().commit();
		em.close();
		Pesan pesan = new Pesan();
		pesan.setPesanDariServer("Data Dihapus !");
		return Response.ok( ).entity(pesan).build();
	}
}
