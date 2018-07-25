package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.mp.model.Asistencia;
import com.mp.model.Persona;
import com.mp.model.Evento;
import javax.persistence.TypedQuery;

/**
 * DAO for Asistencia
 */
@Stateless
public class AsistenciaDao {

    @PersistenceContext(unitName = "proyecto-persistence-unit")
    private EntityManager em;

    public void create(Asistencia entity) {
        em.persist(entity);
    }

    public void deleteById(Integer id) {
        Asistencia entity = em.find(Asistencia.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }

    public Asistencia update(Asistencia entity) {
        return em.merge(entity);
    }

    public List<Evento> listByPersona(Integer idPersona) {
        TypedQuery<Evento> findAllQuery = em.createQuery("SELECT e FROM Evento e, Asistencia a where a.idEvento = e.id and a.idPersona = :persona ORDER BY e.nombre ", Evento.class);
        findAllQuery.setParameter("idPersona", idPersona);

        return findAllQuery.getResultList();
    }

    public List<Persona> listByEvento(Integer idEvento) {
        TypedQuery<Persona> findAllQuery = em.createQuery("SELECT p FROM Persona p, Asistencia a where a.idPersona = p.id and a.idEvento = :idEvento ORDER BY p.nombre ", Persona.class);
        findAllQuery.setParameter("idEvento", idEvento);

        return findAllQuery.getResultList();
    }

   

}
