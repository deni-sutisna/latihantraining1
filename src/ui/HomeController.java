package ui;

import java.io.IOException;
import java.util.List;

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
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import model.Product; 

@Path("/beranda")
public class HomeController {

	private EntityManager em;
// connect ke entity manager
	private static EntityManager getEntityManager() throws NamingException {
		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("contoh1");
		return emf.createEntityManager();
	}

	@GET
	@Path("/hello")
	@Produces("text/plain")
	public String hello() {
		return "Hello World!!! text";
	}

	@GET
	@Path("/helloguys")
	@Produces("text/plain")
	public String helloguys() {
		return "Hello Guys!!! text";
	}
	@GET
	@Path("/welcome")
	public void showJSP(@Context HttpServletResponse response,
			@Context HttpServletRequest request, @Context UriInfo uri)
			throws ServletException, IOException {
		request.setAttribute("basePath", uri.getBaseUri());
		request.getRequestDispatcher("/WEB-INF/views/welcome.jsp").forward(
				request, response);

	}

	@GET
	@Path("/product")
	public void productJSP(@Context HttpServletResponse response,
			@Context HttpServletRequest request, @Context UriInfo uri)
			throws ServletException, IOException {
		request.setAttribute("basePath", uri.getBaseUri());
		request.getRequestDispatcher("/WEB-INF/views/product.jsp").forward(
				request, response);

	}

	@GET
	@Path("/listallproduk")
	@Produces("application/json")
	public List<Product> getProduk(@QueryParam("namaProduk") String nama)
			throws NamingException {
		StringBuilder jqlB = new StringBuilder(
				"Select a from Product a WHERE 1=1 ");
		boolean status = nama != null && !nama.trim().isEmpty();
		if (status) {
			jqlB.append(" AND upper(productName) LIKE CONCAT('%',upper(:nama),'%') ");
		}
		em = getEntityManager();
		Query query = em.createQuery(jqlB.toString());
		if (status) {
			query.setParameter("nama", nama);
		}
 
		return query.getResultList();

	}

	@GET
	@Path("/listallprodukxml")
	@Produces("application/xml")
	public List<Product> getProdukXml() throws NamingException {
		em = getEntityManager();
		return em.createQuery("Select a from Product a").getResultList();

	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/simpanproduct")
	public String saveProduct(Product product) throws Exception {
		em = getEntityManager();
		em.getTransaction().begin();
		em.persist(product);
		em.getTransaction().commit();
		em.close();
		return "ok ";
	}

}
