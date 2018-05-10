package com.jmbo.sporty.repository;

import com.jmbo.sporty.domain.ExtendedUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ExtendedUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedUserRepository extends JpaRepository<ExtendedUser, Long> {

}
