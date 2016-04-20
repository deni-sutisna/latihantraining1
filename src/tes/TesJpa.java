package tes;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import model.Product;  

public class TesJpa {
	private static final String PERSISTENCE_UNIT_NAME = "contoh1";

	private EntityManagerFactory factory;

	public static void main(String[] args) {
		TesJpa jpaMainTes = new TesJpa();
		jpaMainTes.saveProduct();
		//jpaMainTes.updateProduct();
		jpaMainTes.deleteProduct();
		List<Product> listProduct = jpaMainTes.getListProduk();
		for (Product product : listProduct) {
			System.out.println(product.getProductName());
		}
	}

	List<Product> getListProduk() {

		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		EntityManager em = factory.createEntityManager();
		//  hibernate version 
		//String jpaQlLike = "from Product s where s.unitPrice > :arg1  and  s.productName like '%'||:name||'%' ";
		// eclipselink version
		String jpaQlLike = "from Product s where s.unitPrice > :arg1  and  UPPER(s.productName) like concat('%',UPPER(:name),'%')  ";
		//String jpaQlLike = "from Product s where s.unitPrice > :arg1  and  UPPER(s.productName) like  :name  ";
		
		Query query = (Query) em
				.createQuery( jpaQlLike );
		query.setParameter("arg1", 3400);
		query.setParameter("name","ketan"/*new StringBuilder("%").append("merah".toUpperCase()).append("%").toString()*/);
		return query.getResultList();
	}
	   
	void updateProduct() {
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		EntityManager em = factory.createEntityManager();
		String jpaQl = " UPDATE Product a set  a.productName = :name WHERE a.productId = :id ";
		Query query =em
				.createQuery(jpaQl).setParameter("name", "KETAN ITAM").setParameter("id", 252L);
		em.getTransaction().begin();
		query.executeUpdate();
		em.getTransaction().commit();
		em.close();
	}
	
	void deleteProduct() {
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		EntityManager em = factory.createEntityManager();
		String jpaQl = " DELETE FROM Product a  WHERE a.productId = :id ";
		Query query =em
				.createQuery(jpaQl). 
				setParameter("id", 604L);
		em.getTransaction().begin();
		query.executeUpdate();
		em.getTransaction().commit();
		em.close();
	}
	
	void saveProduct() {
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		EntityManager em = factory.createEntityManager();
		Product product = new Product(); 
		product.setProductName(" ARAK PUTIH CAP KILIN ");
		product.setQuantityperUnit("2");
		product.setCategoryId(1);
		product.setDiscontinued(0);
		product.setSupplierId(99);
		product.setUnitPrice(2);
	
		em.getTransaction().begin();
		em.persist(product);
		em.getTransaction().commit();
		em.close();
	}
}
