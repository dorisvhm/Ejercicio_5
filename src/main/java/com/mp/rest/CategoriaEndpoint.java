package com.mp.rest;

import com.mp.dao.CategoriaDao;
import java.util.List;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import com.mp.model.Categoria;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/categorias")
@Produces("application/json")
@Consumes("application/json")
public class CategoriaEndpoint {

    @Inject
    CategoriaDao categoriasService;

    @POST
    public Response create(Categoria entity) {
        categoriasService.create(entity);

        return Response.created(UriBuilder.fromResource(CategoriaEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @GET
    public List<Categoria> listAll() {
        final List<Categoria> results = categoriasService.listAll();
        return results;
    }    
    
}
