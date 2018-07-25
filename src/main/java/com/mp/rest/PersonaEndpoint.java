package com.mp.rest;

import com.mp.dao.PersonaDao;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.OptimisticLockException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.mp.model.Persona;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaEndpoint {

    @Inject
    PersonaDao personasService;

    @POST
    public Response create(Persona entity) {
        personasService.create(entity);

        return Response.created(UriBuilder.fromResource(PersonaEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @GET
    public List<Persona> listAll(@QueryParam("start") Integer startPosition,
            @QueryParam("max") Integer maxResult) {

        final List<Persona> results = personasService.listAll(startPosition, maxResult);
        return results;
    }
    
    @PUT
    public Response update(Persona entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }

        try {
            entity = personasService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }

   
    @GET
    @Path("/personaTexto")
    public List<Persona> listByTexto(@QueryParam("texto") String texto) {
        final List<Persona> results = personasService.listByTexto(texto);
        return results;
    }

}
