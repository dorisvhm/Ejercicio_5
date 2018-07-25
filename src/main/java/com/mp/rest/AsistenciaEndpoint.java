package com.mp.rest;

import com.mp.dao.AsistenciaDao;
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
import com.mp.model.Asistencia;
import com.mp.model.Persona;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/asistencias")
@Produces("application/json")
@Consumes("application/json")
public class AsistenciaEndpoint {

    @Inject
    AsistenciaDao asistenciasService;

    @POST
    public Response create(Asistencia entity) {
        asistenciasService.create(entity);

        return Response.created(UriBuilder.fromResource(AsistenciaEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @PUT
    public Response update(Asistencia entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }

        try {
            entity = asistenciasService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }

    @GET
    @Path("/eventosPersona")
    public List<Evento> listByPersona(@QueryParam("idPersona") Integer idPersona) {
        final List<Evento> results = asistenciasService.listByPersona(idPersona);
        return results;
    }

    @GET
    @Path("/personasEvento")
    public List<Persona> listByEvento(@QueryParam("idEvento") Integer idEvento) {
        final List<Persona> results = asistenciasService.listByEvento(idEvento);
        return results;
    }

}
