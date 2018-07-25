package com.mp.dao;

import com.mp.model.Evento;
import com.mp.model.Ponencia;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.mp.model.Propuesta;
import javax.persistence.TypedQuery;

/**
 * DAO for Propuesta
 */
@Stateless
public class PropuestaDao {

    @PersistenceContext(unitName = "proyecto-persistence-unit")
    private EntityManager em;

    public void create(Propuesta entity) {
        em.persist(entity);
    }

    public void deleteById(Integer id) {
        Propuesta entity = em.find(Propuesta.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }
    
     public Propuesta update(Propuesta entity) {
        return em.merge(entity);
    }

    public List<Evento> listByPonencia(Integer idPonencia) {
        TypedQuery<Evento> findAllQuery = em.createQuery("SELECT e FROM Propuesta p, Evento e where e.id = p.idEvento and p.idPonencia = :idPonencia ORDER BY p.idEvento ", Evento.class);
        findAllQuery.setParameter("idPonencia", idPonencia);

        return findAllQuery.getResultList();
    }
    
    public List<Ponencia> listByEvento(Integer idEvento) {
        TypedQuery<Ponencia> findAllQuery = em.createQuery("SELECT p FROM Ponencia p, Propuesta pro where pro.idPonencia = p.id and pro.idEvento = :idEvento ORDER BY p.ponenecia ", Ponencia.class);
        findAllQuery.setParameter("idEvento", idEvento);

        return findAllQuery.getResultList();
    }

    
    

}
