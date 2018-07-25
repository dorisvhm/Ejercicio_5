package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.mp.model.Evento;

/**
 * DAO for Evento
 */
@Stateless
public class EventoDao {

    @PersistenceContext(unitName = "proyecto-persistence-unit")
    private EntityManager em;

    public void create(Evento entity) {
        em.persist(entity);
    }

    public void deleteById(Integer id) {
        Evento entity = em.find(Evento.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }
    

    public Evento update(Evento entity) {
        return em.merge(entity);
    }

    public List<Evento> listAll(Integer startPosition, Integer maxResult) {
        TypedQuery<Evento> findAllQuery = em.createQuery("SELECT DISTINCT p FROM Evento p ORDER BY p.fecha ", Evento.class);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        return findAllQuery.getResultList();
    }

    public List<Evento> listByLugar(Integer idLugar) {
        TypedQuery<Evento> findAllQuery = em.createQuery("SELECT p FROM Evento p where p.idLugar = :idLugar ORDER BY p.fecha ", Evento.class);
        findAllQuery.setParameter("idLugar", idLugar);

        return findAllQuery.getResultList();
    }

    public List<Evento> listByTexto(String texto) {
        TypedQuery<Evento> findAllQuery = em.createQuery("SELECT p FROM Evento p where p.nombre like :texto or p.descripcion like :texto ORDER BY p.fecha ", Evento.class);
        findAllQuery.setParameter("texto", "%" + texto + "%");

        return findAllQuery.getResultList();
    }
}
