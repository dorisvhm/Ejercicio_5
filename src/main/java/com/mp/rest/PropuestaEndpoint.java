package com.mp.rest;

import com.mp.dao.PropuestaDao;
import com.mp.model.Evento;
import com.mp.model.Ponencia;
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
import com.mp.model.Propuesta;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/propuestas")
@Produces("application/json")
@Consumes("application/json")
public class PropuestaEndpoint {

    @Inject
    PropuestaDao propuestasService;

    @POST
    public Response create(Propuesta entity) {
        propuestasService.create(entity);

        return Response.created(UriBuilder.fromResource(PropuestaEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @PUT
    public Response update(Propuesta entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }

        try {
            entity = propuestasService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }

    @GET
    @Path("/eventosPonencia")
    public List<Evento> listByPonencia(@QueryParam("idPonencia") Integer idPonencia) {
        final List<Evento> results = propuestasService.listByPonencia(idPonencia);
        return results;
    }

    @GET
    @Path("/ponenciasEvento")
    public List<Ponencia> listByEvento(@QueryParam("idEvento") Integer idEvento) {
        final List<Ponencia> results = propuestasService.listByEvento(idEvento);
        return results;
    }

}
