package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.mp.model.Persona;

/**
 * DAO for Persona
 */
@Stateless
public class PersonaDao {

    @PersistenceContext(unitName = "proyecto-persistence-unit")
    private EntityManager em;

    public void create(Persona entity) {
        em.persist(entity);
    }

    public void deleteById(Integer id) {
        Persona entity = em.find(Persona.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }
    

    public Persona update(Persona entity) {
        return em.merge(entity);
    }

    public List<Persona> listAll(Integer startPosition, Integer maxResult) {
        TypedQuery<Persona> findAllQuery = em.createQuery("SELECT DISTINCT p FROM Persona p ORDER BY p.nombre ", Persona.class);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        return findAllQuery.getResultList();
    }

    public List<Persona> listByTexto(String texto) {
        TypedQuery<Persona> findAllQuery = em.createQuery("SELECT p FROM Persona p where p.nombre like :texto or p.apellidos like :texto ORDER BY p.nombre ", Persona.class);
        findAllQuery.setParameter("texto", "%" + texto + "%");

        return findAllQuery.getResultList();
    }
}
