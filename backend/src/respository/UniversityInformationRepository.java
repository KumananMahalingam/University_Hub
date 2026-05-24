package com.universityhub.repository;

import com.universityhub.model.UniversityInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityInformationRepository extends JpaRepository<UniversityInformation, Long> {

    @Query(value = """
        SELECT ui.name AS university_name,
               m.name AS major_name,
               um.admission_average,
               um.tuition_cost,
               um.books_supplies
        FROM university_majors um
        JOIN university_information ui ON um.university_id = ui.id
        JOIN majors m ON um.major_id = m.id
        WHERE um.university_id = :universityId
    """, nativeQuery = true)
    List<Object[]> findUniversityWithMajors(@Param("universityId") Long universityId);
}