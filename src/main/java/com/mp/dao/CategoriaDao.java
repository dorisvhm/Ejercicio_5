package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.mp.model.Categoria;

/**
 * DAO for Categoria
 */
@Stateless
public class CategoriaDao {

    @PersistenceContext(unitName = "tarea-persistence-unit")
    private EntityManager em;

    public void create(Categoria entity) {
        em.persist(entity);
    }
    
    public List<Categoria> listAll() {
        TypedQuery<Categoria> findAllQuery = em.createQuery("SELECT  p FROM Categoria p ORDER BY p.id", Categoria.class);       
        return findAllQuery.getResultList();
    }
   
}
