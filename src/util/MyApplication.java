package util;


import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties; 
import org.glassfish.jersey.filter.LoggingFilter;

@ApplicationPath("/")
public class MyApplication extends ResourceConfig {
 
    public MyApplication() { 
        packages("ui"); 
        register(LoggingFilter.class);   
        property(ServerProperties.TRACING, "ALL");
    }
}