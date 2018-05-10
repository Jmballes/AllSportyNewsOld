package com.jmbo.sporty.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "description")
    private String description;

    @Column(name = "fecha")
    private LocalDate fecha;

    @NotNull
    @Lob
    @Column(name = "imagen", nullable = false)
    private byte[] imagen;

    @Column(name = "imagen_content_type", nullable = false)
    private String imagenContentType;

    @OneToMany(mappedBy = "message")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Category> categories = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private User author;

    @ManyToOne
    private Message parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Message title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public Message url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public Message description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Message fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public Message imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public Message imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Message categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Message addCategory(Category category) {
        this.categories.add(category);
        category.setMessage(this);
        return this;
    }

    public Message removeCategory(Category category) {
        this.categories.remove(category);
        category.setMessage(null);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public User getAuthor() {
        return author;
    }

    public Message author(User user) {
        this.author = user;
        return this;
    }

    public void setAuthor(User user) {
        this.author = user;
    }

    public Message getParent() {
        return parent;
    }

    public Message parent(Message message) {
        this.parent = message;
        return this;
    }

    public void setParent(Message message) {
        this.parent = message;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", url='" + getUrl() + "'" +
            ", description='" + getDescription() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
