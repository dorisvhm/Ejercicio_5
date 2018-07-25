package com.mp.rest;

import com.mp.dao.PonenciaDao;
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
import com.mp.model.Ponencia;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/ponencias")
@Produces("application/json")
@Consumes("application/json")
public class PonenciaEndpoint {

    @Inject
    PonenciaDao ponenciasService;

    @POST
    public Response create(Ponencia entity) {
        ponenciasService.create(entity);

        return Response.created(UriBuilder.fromResource(PonenciaEndpoint.class)
                .path(String.valueOf(entity.getId())).build()).build();
    }

    @PUT
    public Response update(Ponencia entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }

        try {
            entity = ponenciasService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }

    @GET
    @Path("/ponenciasTexto")
    public List<Ponencia> listByNombre(@QueryParam("texto") String texto) {
        final List<Ponencia> results = ponenciasService.listByNombre(texto);
        return results;
    }

    @GET
    @Path("/ponenciasPersona")
    public List<Ponencia> listByPersona(@QueryParam("idPersona") Integer idPersona) {
        final List<Ponencia> results = ponenciasService.listByPersona(idPersona);
        return results;
    }

}
