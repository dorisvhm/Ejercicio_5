package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.mp.model.Ponencia;
import javax.persistence.TypedQuery;

/**
 * DAO for Ponencia
 */
@Stateless
public class PonenciaDao {

    @PersistenceContext(unitName = "proyecto-persistence-unit")
    private EntityManager em;

    public void create(Ponencia entity) {
        em.persist(entity);
    }

    public void deleteById(Integer id) {
        Ponencia entity = em.find(Ponencia.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }
    
    public Ponencia update(Ponencia entity) {
        return em.merge(entity);
    }

    public List<Ponencia> listByPersona(Integer idPersona) {
        TypedQuery<Ponencia> findAllQuery = em.createQuery("SELECT p FROM Ponencia p where p.idPersona = :idPersona ORDER BY p.ponenecia ", Ponencia.class);
        findAllQuery.setParameter("idPersona", idPersona);

        return findAllQuery.getResultList();
    }

    public List<Ponencia> listByNombre(String nombre) {
        TypedQuery<Ponencia> findAllQuery = em.createQuery("SELECT p FROM Ponencia p where p.ponenecia = :nombre ", Ponencia.class);
        findAllQuery.setParameter("nombre", nombre);

        return findAllQuery.getResultList();
    }

  

}
