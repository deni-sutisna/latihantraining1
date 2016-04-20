package ui;

import java.io.File;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import util.AbstractResource; 

@Path("/static")
public class StaticResource extends AbstractResource {
	 
	@GET
	@Path("{path : .*\\.css}")
	@Produces("text/css;charset=UTF-8")
	public File css(@PathParam("path") String path,
			@Context ServletContext context) {
		System.out.println(new StringBuilder(context.getRealPath("/file-static/css")).append(
				"/").toString());
		return new File(new StringBuilder(context.getRealPath("/file-static/css")).append(
				"/").toString(), path);
	}

	@GET
	@Path("{path : .*\\.js}") 
	@Produces("application/javascript;charset=UTF-8")
	public File js(@PathParam("path") String path,
			@Context ServletContext context) {
		return new File(new StringBuilder(context.getRealPath("/file-static/js")).append(
				"/").toString(), path);
	}

}
