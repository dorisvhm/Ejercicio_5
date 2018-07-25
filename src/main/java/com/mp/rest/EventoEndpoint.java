package com.mp.rest;

import com.mp.dao.EventoDao;
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
import com.mp.model.Evento;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/eventos")
@Produces("application/json")
@Consumes("application/json")
public class EventoEndpoint {

    @Inject
    EventoDao eventosService;

    @POST
    public Response create(Evento entity) {
        eventosService.create(entity);

        return Response.created(UriBuilder.fromResource(EventoEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @GET
    public List<Evento> listAll(@QueryParam("start") Integer startPosition,
            @QueryParam("max") Integer maxResult) {

        final List<Evento> results = eventosService.listAll(startPosition, maxResult);
        return results;
    }
    
    @PUT
    public Response update(Evento entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }

        try {
            entity = eventosService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }

    @GET
    @Path("/lugar")
    public List<Evento> listByIdLugar(@QueryParam("idLugar") Integer idLugar) {

        final List<Evento> results = eventosService.listByLugar(idLugar);
        return results;
    }

    @GET
    @Path("/texto")
    public List<Evento> listByTexto(@QueryParam("texto") String texto) {
        final List<Evento> results = eventosService.listByTexto(texto);
        return results;
    }

}
