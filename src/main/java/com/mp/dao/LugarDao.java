package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.mp.model.Lugar;

/**
 * DAO for Lugar
 */
@Stateless
public class LugarDao {

    @PersistenceContext(unitName = "proyecto-persistence-unit")
    private EntityManager em;

    public void create(Lugar entity) {
        em.persist(entity);
        em.flush();
    }
    
    public List<Lugar> listAll() {
        TypedQuery<Lugar> findAllQuery = em.createQuery("SELECT  p FROM Lugar p ORDER BY p.id", Lugar.class);       
        return findAllQuery.getResultList();
    }
    
    public List<Lugar> listByNombreLugar(String nombre) {
        TypedQuery<Lugar> findAllQuery = em.createQuery("SELECT p FROM Lugar p where p.nombre = :nombre ", Lugar.class);
        findAllQuery.setParameter("nombre", nombre);

        return findAllQuery.getResultList();
    }
   
}
