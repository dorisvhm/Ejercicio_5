package com.mp.rest;

import com.mp.dao.LugarDao;
import java.util.List;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import com.mp.model.Lugar;
import javax.inject.Inject;
import javax.ws.rs.QueryParam;

/**
 *
 */
@Stateless
@Path("/lugares")
@Produces("application/json")
@Consumes("application/json")
public class LugarEndpoint {

    @Inject
    LugarDao lugaresService;

    @POST
    public Response create(Lugar entity) {
        lugaresService.create(entity);

        return Response.created(UriBuilder.fromResource(LugarEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @GET
    public List<Lugar> listAll() {
        final List<Lugar> results = lugaresService.listAll();
        return results;
    }    
    
    @GET
    @Path("/lugar")
    public List<Lugar> listByNombreLugar(@QueryParam("nombre") String nombre) {

        final List<Lugar> results = lugaresService.listByNombreLugar(nombre);
        return results;
    }
    
}
