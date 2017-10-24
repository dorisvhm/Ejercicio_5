package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.mp.model.Tarea;

/**
 * DAO for Tarea
 */
@Stateless
public class TareaDao {

    @PersistenceContext(unitName = "tarea-persistence-unit")
    private EntityManager em;

    public void create(Tarea entity) {
        em.persist(entity);
    }

    public void deleteById(Integer id) {
        Tarea entity = em.find(Tarea.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }
    

    public Tarea update(Tarea entity) {
        return em.merge(entity);
    }

    public List<Tarea> listAll(Integer startPosition, Integer maxResult) {
        TypedQuery<Tarea> findAllQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p ORDER BY p.fechaLimite", Tarea.class);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        return findAllQuery.getResultList();
    }

    public List<Tarea> listByCategoria(Integer idCategoria) {
        TypedQuery<Tarea> findAllQuery = em.createQuery("SELECT p FROM Tarea p where p.idCategoria = :idCategoria ORDER BY p.fechaLimite", Tarea.class);
        findAllQuery.setParameter("idCategoria", idCategoria);

        return findAllQuery.getResultList();
    }

    public List<Tarea> listByTexto(String texto) {
        TypedQuery<Tarea> findAllQuery = em.createQuery("SELECT p FROM Tarea p where p.nombre like :texto or p.descripcion like :texto ORDER BY p.fechaLimite", Tarea.class);
        findAllQuery.setParameter("texto", "%" + texto + "%");

        return findAllQuery.getResultList();
    }
}
