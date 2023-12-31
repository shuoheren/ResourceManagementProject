package com.example.UPR_Management.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import antlr.collections.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceDetails {

    @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String resourceCode;

    private String resourceDescription;

    private Date creationDate;

    private Date modifiedDate;

    private Double resourceCost;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "resource_id",referencedColumnName = "resource_id")
    private Resource resource;
    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setCreateDate(Date createDate) {
        this.creationDate = createDate;
    }

    public Date getCreateDate() {
        return creationDate;
    }

}