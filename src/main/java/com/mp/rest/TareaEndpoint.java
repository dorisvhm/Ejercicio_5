package com.mp.rest;

import com.mp.dao.TareaDao;
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
import com.mp.model.Tarea;
import javax.inject.Inject;
import javax.ws.rs.PathParam;

/**
 *
 */
@Stateless
@Path("/tareas")
@Produces("application/json")
@Consumes("application/json")
public class TareaEndpoint {

    @Inject
    TareaDao tareasService;

    @POST
    public Response create(Tarea entity) {
        tareasService.create(entity);

        return Response.created(UriBuilder.fromResource(TareaEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @GET
    public List<Tarea> listAll(@QueryParam("start") Integer startPosition,
            @QueryParam("max") Integer maxResult) {

        final List<Tarea> results = tareasService.listAll(startPosition, maxResult);
        return results;
    }
    
    @PUT
    public Response update(Tarea entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }

        try {
            entity = tareasService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }

    @GET
    @Path("/categoria/{idCategoria:[0-9][0-9]*}")
    public List<Tarea> listByIdCategoria(@QueryParam("idCategoria") Integer idCategoria) {

        final List<Tarea> results = tareasService.listByCategoria(idCategoria);
        return results;
    }

    @GET
    @Path("/texto/{texto}")
    public List<Tarea> listByTexto(@QueryParam("texto") String texto) {

        final List<Tarea> results = tareasService.listByTexto(texto);
        return results;
    }

}
