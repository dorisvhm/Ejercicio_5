package com.mp.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Propuesta implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;

    @Column
    private Integer idEvento;

    @Column
    private Integer idPonencia;

    @Column
    private Boolean participa;

    public Integer getId() {
        return this.id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Propuesta)) {
            return false;
        }
        Propuesta other = (Propuesta) obj;
        if (id != null) {
            if (!id.equals(other.id)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    public Integer getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Integer idEvento) {
        this.idEvento = idEvento;
    }

    public Integer getIdPonencia() {
        return idPonencia;
    }

    public void setIdPonencia(Integer idPonencia) {
        this.idPonencia = idPonencia;
    }

    public Boolean getParticipa() {
        return participa;
    }

    public void setParticipa(Boolean participa) {
        this.participa = participa;
    }

    @Override
    public String toString() {
        String result = getClass().getSimpleName() + " ";

        return result;
    }
}
