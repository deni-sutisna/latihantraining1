package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "produk")  
@Entity
@Table(name = "PRODUCTS")
public class Product {   
	@Id
	@Column(name = "PRODUCTID")  
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQMYCLASSID")
	//@SequenceGenerator(name="SEQMYCLASSID", sequenceName="SEQMYCLASSID",allocationSize=1)
	@SequenceGenerator(name="SEQMYCLASSID", sequenceName="SEQMYCLASSID" )
	private Long productId;
	
	@Column(name = "PRODUCTNAME")
	private String productName;
	
	@Column(name = "SUPPLIERID")
	private Integer supplierId;
	
	@Column(name = "CATEGORYID")
	private Integer categoryId; 
	
	@Column(name = "QUANTITYPERUNIT")
	private String quantityperUnit;
	
	@Column(name = "UNITPRICE")
	private Integer unitPrice;
	
	@Column(name = "UNITSINSTOCK")
	private Integer unitsInStock;
	
	@Column(name = "UNITSONORDER")
	private Integer unitsOnOrder;
	
	@Column(name = "REORDERLEVEL")
	private Integer reorderLevel;
	
	@Column(name = "DISCONTINUED")
	private Integer discontinued;

	
	 
	@XmlElement
	public Long getProductId() {
		return productId;
	}


	public void setProductId(Long productId) {
		this.productId = productId;
	}

	@XmlElement
	public String getProductName() {
		return productName;
	}


	public void setProductName(String productName) {
		this.productName = productName;
	}

	@XmlElement
	public Integer getSupplierId() {
		return supplierId;
	}


	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}

	@XmlElement
	public Integer getCategoryId() {
		return categoryId;
	}


	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	@XmlElement
	public String getQuantityperUnit() {
		return quantityperUnit;
	}


	public void setQuantityperUnit(String quantityperUnit) {
		this.quantityperUnit = quantityperUnit;
	}

	@XmlElement
	public Integer getUnitPrice() {
		return unitPrice;
	}


	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}

	@XmlElement
	public Integer getUnitsInStock() {
		return unitsInStock;
	}


	public void setUnitsInStock(Integer unitsInStock) {
		this.unitsInStock = unitsInStock;
	}

	@XmlElement
	public Integer getUnitsOnOrder() {
		return unitsOnOrder;
	}


	public void setUnitsOnOrder(Integer unitsOnOrder) {
		this.unitsOnOrder = unitsOnOrder;
	}

	@XmlElement
	public Integer getReorderLevel() {
		return reorderLevel;
	}


	public void setReorderLevel(Integer reorderLevel) {
		this.reorderLevel = reorderLevel;
	}

	@XmlElement
	public Integer getDiscontinued() {
		return discontinued;
	}


	public void setDiscontinued(Integer discontinued) {
		this.discontinued = discontinued;
	}

 
	
	 
}
